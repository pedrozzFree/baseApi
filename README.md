---

# Pedrozz API - Base Node.js com Autenticação por API Key

Este projeto é uma base completa para criação de uma API em Node.js utilizando Express. Inclui sistema de autenticação via API Key, suporte a múltiplas rotas e integração com ferramentas externas como scrapers e geradores dinâmicos.

---

## Funcionalidades

- Estrutura modular com rotas dinâmicas
- Sistema de verificação de API Keys
- Suporte a geração de conteúdo dinâmico (ex: imagens, textos, dados externos)
- Integração com scrapers personalizados
- Interface web opcional via `public/dash.html`

---

## Requisitos

- Node.js 16 ou superior
- npm ou yarn
- (opcional) Ambiente Linux com Bash para uso do `start.sh`

---

## Instalação

```bash
git clone https://github.com/pedrozzFree/baseApi.git
cd baseApi
npm install

Ou, se preferir:

yarn


---

Execução

Local

node index.js

Linux com script

bash start.sh

O servidor será iniciado na porta definida dentro do index.js (por padrão, porta 3000).


---

Uso da API

Autenticação

A API utiliza autenticação por chave (API Key). As chaves válidas estão armazenadas no arquivo:

database/apikeys.json

Exemplo de requisição:

/api/rota?parametro=valor&apikey=SUA_KEY

Estrutura de Rotas

As rotas são registradas dinamicamente. Para adicionar uma nova funcionalidade:

1. Crie o módulo correspondente.


2. Registre a rota no index.js (ou no sistema automático, se já integrado).


3. Adicione a lógica dentro de routes/ ou controllers/ conforme a organização usada.




---

Estrutura do Projeto

base-api/
├── database/           # Dados locais e verificação de API Keys
│   ├── apikeys.json
│   └── scraper.js
├── public/             # Interface HTML opcional
├── index.js            # Servidor principal e registro de rotas
├── package.json        # Dependências do projeto
├── start.sh            # Script opcional de inicialização
└── node_modules/       # Dependências instaladas


---

Segurança

O sistema de autenticação é básico e deve ser melhorado para produção (ex: tokens JWT, banco de dados seguro).

As requisições são tratadas via express, mas middleware de segurança como CORS, Helmet e validação de entrada ainda podem ser adicionados conforme a necessidade.



---

Licença e Créditos

Este projeto foi desenvolvido por Pedrozz Mods e disponibilizado gratuitamente para a comunidade.

O uso comercial é permitido, mas manter os créditos é uma forma justa de reconhecimento.


---

Considerações finais

Essa base serve como ponto de partida para criar sua própria API modular e segura. Personalize, expanda e adapte conforme sua necessidade.

---