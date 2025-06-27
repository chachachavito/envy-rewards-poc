import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: true, message: "Método não permitido" });
  }

  const { placa } = req.body;
  if (!placa || typeof placa !== "string") {
    return res
      .status(400)
      .json({ error: true, message: "Placa inválida ou ausente." });
  }

  // Tentativa 1: APIPlacas
  try {
    const apiKey = process.env.PLACA_API_KEY;
    const placasRes = await fetch(
      `https://wdapi2.com.br/consulta/${placa}/${apiKey}`
    );
    if (
      placasRes.ok &&
      placasRes.headers.get("content-type")?.includes("application/json")
    ) {
      const placasData = await placasRes.json();

      if (placasData && typeof placasData === "object" && !placasData.erro) {
        return res
          .status(200)
          .json({ origem: "APIPlacas", response: placasData });
      }
    } else {
      console.warn("Resposta inválida da APIPlacas:", await placasRes.text());
    }
  } catch (err) {
    console.warn(
      "Erro ao consultar APIPlacas:",
      err instanceof Error ? err.message : err
    );
  }

  return res
    .status(404)
    .json({ error: true, message: "Placa não encontrada em nenhuma base." });
}
