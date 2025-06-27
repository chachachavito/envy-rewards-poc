import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const data = req.body;

    // Aqui você pode validar ou processar os dados como quiser
    console.log('Dados recebidos no cadastro:', data);

    return res.status(200).json({ message: 'Cadastro recebido com sucesso!' });
  } catch (error) {
    console.error('Erro no cadastro:', error);
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}
