// trigger vercel deploy
import FadeTransition from "./components/FadeTransition";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Header from "./components/Header";
import VideoBackground from "./components/VideoBackground";

interface DadosPlaca {
  response: {
    MARCA: string;
    MODELO: string;
    SUBMODELO?: string;
    VERSAO?: string;
    ano?: string;
    anoModelo?: string;
    cor?: string;
    cor_veiculo?: { cor?: string };
    municipio?: string;
    chassi?: string;
  };
  origem?: string;
}

export default function Home() {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    celular: "",
  });
  const [placa, setPlaca] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [dadosPlaca, setDadosPlaca] = useState<DadosPlaca | null>(null);
  const [etapa, setEtapa] = useState<"cadastro" | "placa" | "final">("placa");
  const [mostrarJsonCompleto, setMostrarJsonCompleto] = useState(false);
  const [telaInicial, setTelaInicial] = useState(true);
  const [loadingVerificacao, setLoadingVerificacao] = useState(false);
  const [mostrarDetalhesVeiculo, setMostrarDetalhesVeiculo] = useState(false);
  const [mostrarConfete, setMostrarConfete] = useState(false);
  const [tituloFinal, setTituloFinal] = useState("");

  useEffect(() => {
    if (etapa === "placa") {
      setLoadingVerificacao(false);
    }
  }, [etapa]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Durante a fase de testes, permitimos que o mesmo CPF envie múltiplas vezes.
    // A validação de uso único será implementada futuramente no backend.
    try {
      const res = await fetch("/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, placa }),
      });

      const data = await res.json();

      if (res.ok || data?.message?.toLowerCase().includes("já cadastrado")) {
        setMensagem(
          "apresente esse QR CODE em uma concessionária Renault e garanta já sua vantagem exclusiva."
        );
        setTituloFinal("parabéns");
        setEtapa("final");
        setMostrarConfete(true);
        setTimeout(() => setMostrarConfete(false), 8000);
      } else {
        setMensagem(data.message || "Erro inesperado no cadastro");
      }
    } catch (err) {
      console.error(err);
      setMensagem("Erro na comunicação com o servidor");
    }
  };

  const verificarPlaca = async () => {
    if (loadingVerificacao) return;
    // Evita requisições com campo de placa vazio ou menor que 6 caracteres
    if (!placa || placa.trim().length < 6) {
      setLoadingVerificacao(false);
      return;
    }
    if (placa === "KAR9D14") {
      setMensagem(
        `xi… alguém já invejou essa placa ${placa} vá invejar outro Renault Kardian.`
      );
      setEtapa("final");
      setTituloFinal("não foi dessa vez");
      setMostrarConfete(false);
      return;
    }
    setLoadingVerificacao(true);
    try {
      const res = await fetch("/api/verificarPlaca", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ placa }),
      });

      const data = await res.json();
      console.log("Resultado da verificação:", data);

      if (!data?.response) {
        setMensagem(data.message || "Placa não encontrada.");
        setLoadingVerificacao(false);
        return;
      }

      setDadosPlaca(data);

      const marca = data?.response?.marca || data?.response?.MARCA || "";
      const modelo = data?.response?.modelo || data?.response?.MODELO || "";
      const submodelo =
        data?.response?.submodelo || data?.response?.SUBMODELO || "";

      const marcaUp = marca.toUpperCase();
      const modeloUp = modelo.toUpperCase();
      const submodeloUp = submodelo.toUpperCase();

      if (
        marcaUp === "RENAULT" &&
        (modeloUp.includes("KARDIAN") || submodeloUp.includes("KARDIAN"))
      ) {
        setMensagem("Parabéns! Você encontrou um Renault Kardian!");
        setEtapa("cadastro");
        setMostrarConfete(true);
        setTimeout(() => setMostrarConfete(false), 8000);
      } else {
        setMensagem(
          `a placa <strong>${placa}</strong> não é válida. \nprocure um Renault Kardian para invejar, \nanote a placa e tente novamente`
        );
        setEtapa("final");
        setMostrarConfete(false);
      }
    } catch (err) {
      console.error(err);
      setMensagem("Erro ao verificar a placa.");
    }
    setLoadingVerificacao(false);
  };

  return (
    <>
      <Header />
      <VideoBackground />
      <div className="relative z-10 ">
        <div className="min-h-screen flex items-center justify-center text-white text-center">
          {mostrarConfete && <Confetti recycle={false} />}
          {telaInicial ? (
            <div className="text-center p-6">
              <h1 className="text-4xl font-bold mb-0 font-nouvelr leading-none">
                viu um Renault Kardian{" "}
                <span className="hidden md:inline">&nbsp;</span>
                <br className="block md:hidden" />
                na rua e a inveja bateu?
              </h1>{" "}
              <p className="mb-7 text-lg font-nouvelr font-semibold ">
                anote aqui a placa e ganhe um desconto exclusivo
              </p>
              <button
                className="bg-white text-black px-16  py-4  text-lg hover:bg-gray-100 transition font-nouvelr font-bold"
                onClick={() => setTelaInicial(false)}
              >
                sim, invejei
              </button>
            </div>
          ) : (
            <form
              onSubmit={
                etapa === "cadastro"
                  ? handleSubmit
                  : (e) => {
                      e.preventDefault();
                      verificarPlaca();
                    }
              }
              className="bg-white p-8  w-full max-w-md"
            >
              <FadeTransition keyId={etapa}>
                {/* --- Seção de exibição do QR CODE (apenas para premiados) --- */}
               {etapa === "final" && tituloFinal?.toLowerCase() === "parabéns" && (
                  <div className="-mx-8 -mt-8 mb-4">
                    <img
                      src="/assets/giftcard.png"
                      alt="QR Code"
                      className="w-full"
                    />
                  </div>
                )}
                {/* --- Fim da seção QR CODE --- */}

                {/* --- Título principal da tela --- */}
                <h1 className="text-2xl font-bold mb-0 text-black font-nouvelr  whitespace-pre-line ">
                  {etapa === "cadastro"
                    ? "parabéns"
                    : etapa === "placa"
                    ? "verifique a placa"
                    : etapa === "final"
                    ? tituloFinal || "não foi dessa vez"
                    : "não foi dessa vez"}
                </h1>

                {/* --- Mensagem motivacional para quem acertou --- */}
                {etapa === "cadastro" && mensagem.includes("Parabéns") && (
                  <p className="mb-0 text-center text-black text-xl font-nouvelr font-bold whitespace-pre-line">
                    inveja da boa, desconto do bom
                  </p>
                )}
                {/* --- Instruções de cada etapa --- */}
                <p className="text-xl font-nouvelr text-black mb-4 whitespace-pre-line leading-none">
                  {etapa === "cadastro"
                    ? "preencha aqui e pegue o seu."
                    : etapa === "placa"
                    ? "digite a placa do Kardian\nque você invejou."
                    : ""}
                </p>
                {/* --- Formulário de cadastro --- */}
                {etapa === "cadastro" && (
                  <>
                    {/* Campos do formulário do premiado */}
                    {["nome", "cpf", "email", "celular"].map((field) => (
                      <input
                        key={field}
                        name={field}
                        placeholder={
                          field === "nome"
                            ? "seu nome completo"
                            : field === "cpf"
                            ? "seu CPF (somente números)"
                            : field === "email"
                            ? "seu e-mail"
                            : field === "celular"
                            ? "seu celular com DDD"
                            : ""
                        }
                        value={formData[field as keyof typeof formData]}
                        onChange={handleChange}
                        className="mb-4 w-full p-4 border text-lg border-gray-300 text-black   focus:outline-none focus:ring-2 focus:ring-gray-400 font-nouvelr"
                        required
                      />
                    ))}
                    <button
                      type="submit"
                      className="w-full bg-black text-white py-4  hover:bg-gray-600 font-nouvelr font-bold text-lg"
                    >
                      cadastrar
                    </button>
                  </>
                )}
                {/* --- Fim do formulário de cadastro --- */}
                {/* --- Formulário de verificação da placa --- */}
                {etapa === "placa" && (
                  <>
                    <input
                      name="placa"
                      placeholder="digite a placa"
                      value={placa}
                      onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                      className="mb-4 w-full p-4  text-lg border border-gray-300 text-black font-nouvelr    focus:outline-none focus:ring-2 focus:ring-gray-400"
                      required
                      pattern="[A-Z]{3}[0-9]{4}|[A-Z]{3}[0-9][A-Z][0-9]{2}"
                      title="Informe uma placa válida no formato ABC1234 ou ABC1D23"
                    />
                    <button
                      type="submit"
                      disabled={loadingVerificacao}
                      className={`w-full py-2  text-white ${
                        loadingVerificacao
                          ? "bg-gray-400 cursor-not-allowed font-nouvelr font-bold text-lg py-4"
                          : "bg-black hover:bg-gray-600 font-nouvelr font-bold text-lg py-4"
                      }`}
                    >
                      {loadingVerificacao
                        ? "verificando..."
                        : "verificar placa"}
                    </button>
                  </>
                )}
                {/* --- Fim do formulário de verificação da placa --- */}
                {/* --- Exibe mensagens de erro, instruções ou feedback --- */}
                {mensagem &&
                  !mensagem.includes(
                    "Parabéns! Você encontrou um Renault Kardian!"
                  ) && (
                    <p
                      className="mt-0 text-center text-lg text-black font-medium whitespace-pre-line leading-none"
                      dangerouslySetInnerHTML={{ __html: mensagem }}
                    />
                  )}
                {/* --- Botão para tentar novamente caso não tenha sido premiado --- */}
                {etapa === "final" && tituloFinal?.toLowerCase() !== "parabéns" && (
                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      className="w-auto bg-black text-white py-4 px-12 font-nouvelr font-bold text-lg  hover:bg-gray-600 transition"
                      onClick={() => {
                        setPlaca("");
                        setMensagem("");
                        setDadosPlaca(null);
                        setEtapa("placa");
                        setLoadingVerificacao(false);
                      }}
                    >
                      tentar novamente
                    </button>
                  </div>
                )}
                {/* --- (Opcional) Detalhes do veículo e JSON bruto (oculto por padrão) --- */}
                {!mensagem.toLowerCase().includes("parabéns") &&
                  dadosPlaca &&
                  "response" in dadosPlaca && (
                    <div className="mt-4 text-xl text-gray-700 text-center hidden">
                      <p>
                        Você viu um veículo da marca{" "}
                        <strong>{dadosPlaca.response.MARCA}</strong>, modelo{" "}
                        <strong>{dadosPlaca.response.MODELO}</strong>.
                      </p>
                    </div>
                  )}
                {dadosPlaca?.response && (
                  <div className="mt-6 text-gray-800 bg-white-4 rounded max-h-[500px] overflow-auto hidden">
                    {/* Detalhes técnicos do veículo - para debugging ou curiosidade */}
                    <button
                      type="button"
                      onClick={() =>
                        setMostrarDetalhesVeiculo(!mostrarDetalhesVeiculo)
                      }
                      className="text-sm text-white hover:text-gray-600 underline mb-2 mr-4"
                    >
                      {mostrarDetalhesVeiculo
                        ? "Ocultar detalhes do veículo"
                        : "Ver detalhes do veículo"}
                    </button>
                    {mostrarDetalhesVeiculo && (
                      <>
                        <h2 className="font-semibold mb-4">
                          Detalhes do Veículo
                        </h2>
                        <ul className="text-sm space-y-1">
                          <li>
                            <strong>Marca:</strong> {dadosPlaca.response.MARCA}
                          </li>
                          <li>
                            <strong>Modelo:</strong>{" "}
                            {dadosPlaca.response.MODELO}
                          </li>
                          <li>
                            <strong>Submodelo:</strong>{" "}
                            {dadosPlaca.response.SUBMODELO}
                          </li>
                          <li>
                            <strong>Versão:</strong>{" "}
                            {dadosPlaca.response.VERSAO}
                          </li>
                          <li>
                            <strong>Ano:</strong> {dadosPlaca.response.ano}
                          </li>
                          <li>
                            <strong>Ano Modelo:</strong>{" "}
                            {dadosPlaca.response.anoModelo}
                          </li>
                          <li>
                            <strong>Cor:</strong>{" "}
                            {dadosPlaca.response.cor ||
                              dadosPlaca.response?.cor_veiculo?.cor}
                          </li>
                          <li>
                            <strong>Município:</strong>{" "}
                            {dadosPlaca.response.municipio}
                          </li>
                          <li>
                            <strong>Chassi:</strong>{" "}
                            {dadosPlaca.response.chassi}
                          </li>
                        </ul>
                      </>
                    )}
                    {mostrarJsonCompleto ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setMostrarJsonCompleto(false)}
                          className="mt-4 text-xs text-gray-600 underline"
                        >
                          Ocultar JSON completo
                        </button>
                        <pre className="mt-2 text-xs bg-white p-3 rounded text-gray-700 overflow-auto">
                          {JSON.stringify(dadosPlaca.response, null, 2)}
                        </pre>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setMostrarJsonCompleto(true)}
                        className="mt-4 text-xs  text-white hover:text-gray-600 underline"
                      >
                        Ver JSON completo
                      </button>
                    )}
                  </div>
                )}
                {/* --- Botão para baixar o QR CODE se for premiado --- */}
                {etapa === "final" && tituloFinal?.toLowerCase() === "parabéns" && (
                  <button
                    type="button"
                    onClick={() => window.open("/")}
                    className="w-full bg-black text-white py-4 mt-4 hover:bg-gray-600 font-nouvelr font-bold text-lg"
                  >
                    baixar QR CODE
                  </button>
                )}
                {/* --- Fim do botão QR CODE --- */}
              </FadeTransition>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
