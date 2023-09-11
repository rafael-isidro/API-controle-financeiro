
<h1 align="center">
    <a href="#" alt="API Controle Financeiro"> API Controle Financeiro </a>
</h1>

<h3 align="center">
Bem-vindo ao projeto da API Controle Financeiro! Esta é uma API RESTful construída em Node.js que oferece funcionalidades para cadastro, login, gerenciamento de perfil, categorias, consultas e transações financeiras. Siga as instruções abaixo para entender como executar o projeto e utilizar suas funcionalidades.
</h3>


Tabela de conteúdos
=================
<!--ts-->
   * [Sobre o projeto](#-sobre-o-projeto)
   * [Funcionalidades](#%EF%B8%8F-funcionalidades)
   * [Como executar o projeto](#%EF%B8%8F-como-executar-o-projeto)
     * [Pré-requisitos](#pré-requisitos)
     * [Rodando o Projeto](#rodando-o-projeto)
   * [Tecnologias](#-tecnologias)
   * [Estrutura do Projeto](#-estrutura-do-projeto)
   * [Autor](#-autor)
<!--te-->


## 💻 Sobre o projeto

O projeto consiste na construção de uma RESTful API que permite aos usuários realizar ações como cadastro, login, gerenciamento de perfil, categorias e transações financeiras. A API garante a segurança dos dados, permitindo que cada usuário acesse e manipule apenas suas próprias informações financeiras. O projeto foi desenvolvido com a integração a um banco de dados PostgreSQL.

---

## ⚙️ Funcionalidades

A API Controle Financeiro oferece as seguintes funcionalidades:

- Cadastrar Usuário
- Fazer Login
- Detalhar Perfil do Usuário Logado
- Editar Perfil do Usuário Logado
- Listar categorias
- Listar transações
- Detalhar transação
- Cadastrar transação
- Editar transação
- Remover transação
- Obter extrato de transações

---

## ▶️ Como executar o projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### Rodando o projeto

```bash

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3000 - acesse http://localhost:3000 

```
---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

-   **[Node Js](https://nodejs.org/en)**
-   **[Express](https://expressjs.com/)**
-   **[Bcrypt](https://www.npmjs.com/package/bcrypt)**
-   **[Node-postgres (pg)](https://www.npmjs.com/package/pg)**
-   **[JSON Web Token](https://www.npmjs.com/package/jsonwebtoken)**
-   **[Nodemon (como dependencia de desenvolvimento)](https://www.npmjs.com/package/nodemon)**
-   **[PostgreSQL](https://www.postgresql.org/)**
-   **[Beekeeper](https://www.beekeeperstudio.io/)**
-   **[Insomnia](https://insomnia.rest/)**

## 🧱 Estrutura do Projeto

```sh
.
├── src
│   ├── index.js
│   ├── config
│   │   └── conexao.js
│   ├── controladores
│   │   ├── categorias.js
│   │   ├── transacoes.js
│   │   └── usuarios.js
│   ├── intermediarios
│   │   └── verificarLogin.js
│   ├── repositorios
│   │   ├── categorias.js
│   │   ├── transacoes.js
│   │   └── usuarios.js
│   ├── rotas
│   │   └── rotas.js
│   └── utils
│       ├── compararSenhas.js
│       ├── criptografarSenha.js
│       └── gerarToken.js
│── dadosSensiveis.js
│── dump.sql
└── package.json
```
---
## 🦸 Autor

<a href="https://github.com/rafael-isidro">
    <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/118776145?v=4" width="100px;" alt="Foto de perfil - Rafael Isidro"/>
    <br />
    <sub><b>Rafael Isidro</b></sub>
</a> 
<a href="https://github.com/rafael-isidro" title="Github">🚀</a>


 [![Linkedin Badge](https://img.shields.io/badge/-Rafael%20Isidro-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/rafael-isidro/)](https://www.linkedin.com/in/rafael-isidro/) 
