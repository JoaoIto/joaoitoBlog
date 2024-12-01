# joaoitoBlog

**joaoitoBlog** é um projeto fullstack desenvolvido com **Next.js**, projetado para ser um portfólio pessoal com uma página de administração para publicação de projetos. O sistema utiliza uma **API integrada** para a gestão dos projetos, com conexão ao banco de dados **MongoDB** para bando de dados.

<p align="center">
  <img src=".github/img/joaoito-blog.vercel.app_ (1).png" autoplay muted loop/>
</p>

## Funcionalidades

- **Portfólio pessoal**: Exibe projetos desenvolvidos, com descrições, tecnologias utilizadas e links para repositórios e deploys.
- **Administração de projetos**: Uma página de administração protegida onde novos projetos podem ser publicados, editados e excluídos.
- **API RESTful**: Fornece um backend integrado para a criação, leitura e gerenciamento dos projetos.
- **Conexão com MongoDB**: Banco de dados usado para armazenar e gerenciar as informações dos projetos.

## Tecnologias Utilizadas

### Frontend

- **Next.js**: Framework React para desenvolvimento de aplicações web, que permite renderização híbrida (estática e dinâmica) e otimização para SEO.
- **Tailwind CSS**: Framework de CSS para estilização rápida e eficiente, utilizado para construir um design moderno e responsivo.

### Backend

- **Next.js API Routes**: Utilizadas para criar as rotas de API que permitem o gerenciamento dos projetos (GET e POST).
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar os dados dos projetos.
- **MongoDB Node.js Driver**: Usado para conectar e interagir com o MongoDB dentro das rotas de API.

## Instalação

Siga os passos abaixo para rodar o projeto localmente:

1. Clone o repositório:
   ```bash
   git clone https://github.com/joaoito/joaoitoBlog.git
   cd joaoitoBlog
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure a conexão com o MongoDB:
   Certifique-se de que o **MongoDB** está rodando localmente ou em um servidor. A string de conexão utilizada é:
   ```bash
   mongodb://localhost:27017/joaoitoBlog
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Acesse a aplicação no navegador:
   ```bash
   http://localhost:3000
   ```

## Estrutura do Projeto

- `/pages`: Contém as páginas do portfólio e a página de administração.
- `/app/api/projects`: Contém as rotas de API para realizar operações de CRUD sobre os projetos.
- `/app/interfaces`: Contém as interfaces TypeScript, como a interface `IProjeto`, que define a estrutura dos projetos.

## Endpoints da API

- **GET /api/projetos**: Retorna todos os projetos cadastrados no MongoDB.
- **POST /api/projetos**: Cria um novo projeto. Requer um corpo JSON com as informações do projeto.

### Exemplo de corpo da requisição POST:
```json
{
  "nome": "Meu Novo Projeto",
  "descricao": "Descrição do projeto",
  "tecnologias": ["Next.js", "MongoDB"],
  "linkGit": "https://github.com/usuario/meu-novo-projeto",
  "linkAcesso": "https://meu-novo-projeto.com"
}
```

---


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
