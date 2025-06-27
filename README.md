# Envy Rewards – PoC de Validação de Placa

🔗 Acesse a versão publicada: [poc-envy-rewards.vercel.app](https://poc-envy-rewards.vercel.app)

⚠️ **Atenção**: o backend não é utilizado nesta versão.  
Para rodar o front localmente, é necessário uma chave de API. Use o arquivo `.env.example` como base.

---

## O que faz

Valida se uma **placa** pertence a um **Renault Kardian** e libera um **desconto único e pessoal**.

---

## Como usar

1. Clonar o projeto:

   ```bash
   git clone https://github.com/chachachavito/envy-rewards-poc.git
   ```

2. Instalar as dependências:

   ```bash
   cd frontend
   npm install
   ```

3. Criar um arquivo `.env.local` na pasta `frontend` com a estrutura abaixo:

   ```env
   NEXT_PUBLIC_API_KEY=SUA_CHAVE_AQUI
   ```

4. Rodar o projeto:

   ```bash
   npm run dev
   ```

---

### Testes de placa

Use essas placas para testar o sistema:

| Placa   | Resultado esperado                                |
|---------|---------------------------------------------------|
| TAO4E21 | Placa de um Renault Kardian                      |
| FMC4225 | Placa de um carro que **não** é um Renault Kardian |
| KAR9D14 | Placa que simula uma já utilizada anteriormente   |

---

## Observações importantes

- A API utilizada atualmente na prova de conceito **não é oficial**.
- Ela consulta **dados públicos e não identificáveis**, como marca, modelo e ano.
- Pode **não identificar placas recém-emplacadas**, por não ter atualização em tempo real.

---

## Uso em produção

Para ambientes reais, recomenda-se usar a **API oficial do SERPRO** – WSDenatran:

- Catálogo: https://www.gov.br/conecta/catalogo/apis/wsdenatran
- Loja SERPRO: https://loja.serpro.gov.br/consultasenatran

> **Importante:**  
> O acesso é restrito a empresas do setor automotivo (ex: Renault).  
> O pedido precisa ser feito diretamente pela Renault, com justificativa formal.  
> A aprovação pode levar cerca de 30 dias.
