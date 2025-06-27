# Envy Rewards – PoC de Validação de Placa

> Atenção: o backend não é utilizado nesta versão.

## O que faz  
Validar se uma **placa** pertence a um **Renault Kardian** e liberar um **desconto único e pessoal**.

## Como usar  
1. Clonar o projeto  
2. Instalar as dependências:
   ```bash
   npm install
   ```
3. Rodar o front na pasta `frontend`:
   ```bash
   npm run dev
   ```

## Testes de placa  
Usar essas placas para testar:

| Placa     | Resultado esperado                          |
|-----------|----------------------------------------------|
| TAO4E21   | É Kardian → libera desconto                  |
| EUX7G23   | Não é Kardian → mostrar mensagem informativa |
| KAR9D14   | Placa fake usada para simular controle de uso único |

## API utilizada

A aplicação consome dados reais da seguinte API pública:

[https://apicarros.com/v1/consulta/{placa}/json](https://apicarros.com/v1/consulta/{placa}/json)

> É necessário informar um token de autenticação.  
> O token é configurado via arquivo `.env.local` com a variável `NEXT_PUBLIC_API_TOKEN`.

## Observações importantes

- A API utilizada nesta prova de conceito **não é oficial**.
- Ela consulta dados públicos e não identificáveis (como marca, modelo e ano), sendo segura para testes.
- Por se tratar de um serviço de terceiros, **não há garantia de atualização em tempo real**, o que pode impactar a identificação de placas recém-emplacadas.

### Para uso em produção

É recomendado utilizar a API oficial do SERPRO, chamada **WSDenatran**, que acessa diretamente a base da **Senatran (Detran)**:

- Catálogo: https://www.gov.br/conecta/catalogo/apis/wsdenatran  
- Compra direta: https://loja.serpro.gov.br/consultasenatran

> Importante:  
> Apenas empresas do setor automotivo, como a Renault, podem solicitar acesso.  
> O pedido deve ser feito pela **Renault diretamente ao SERPRO**, com justificativa formal.  
> A liberação pode levar cerca de 30 dias ou mais.
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
   git clone https://github.com/seu-usuario/envy-rewards-poc.git
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

## Testes de placa

Usar essas placas para testar:

| Placa       | Resultado esperado    |
|-------------|------------------------|
| RENAULT01   | Aprovado               |
| INEXISTENTE | Não encontrado         |
| INVALIDA    | Formato inválido       |

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