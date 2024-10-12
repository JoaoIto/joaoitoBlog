// app/api/projetos/route.ts

import { IProjeto } from "@/app/interfaces/IProjeto";
import { getMongoClient } from "../database/connection";

/* // Array base de projetos simulados
const projects: IProjeto[] = [
  {
    id: '1',
    nome: 'Portfolio Website',
    descricao: 'Um site de portfólio pessoal usando Next.js e Tailwind CSS.',
    tecnologias: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    linkGit: 'https://github.com/usuario/portfolio-website',
    linkAcesso: 'https://meu-portfolio.com',
    dataCriacao: '2023-10-10T14:48:00.000Z'
  },
  {
    id: '2',
    nome: 'E-commerce API',
    descricao: 'API RESTful para uma aplicação de e-commerce, construída com Node.js e MongoDB.',
    tecnologias: ['Node.js', 'MongoDB', 'Express'],
    linkGit: 'https://github.com/usuario/ecommerce-api',
    linkAcesso: '',
    dataCriacao: '2023-08-15T10:00:00.000Z'
  },
  {
    id: '3',
    nome: 'Aplicativo de To-do List',
    descricao: 'Um simples aplicativo de lista de tarefas usando React Native.',
    tecnologias: ['React Native', 'Expo', 'JavaScript'],
    linkGit: 'https://github.com/usuario/todo-app',
    linkAcesso: '',
    dataCriacao: '2023-05-20T09:30:00.000Z'
  }
]; */

export async function GET() {
  try {
    // Conectando ao MongoDB
    const client = await getMongoClient();
    const db = client.db('joaoitoBlog');
    
    // Acessando a collection 'projects'
    const collection = db.collection('projects');

    // Buscando todos os projetos
    const projects = await collection.find({}).toArray();

    // Retornando os projetos encontrados
    return new Response(JSON.stringify({ projects }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    // Tratamento de erros
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
export async function POST(request: Request) {
  try {
    // Lê os dados do corpo da requisição
    const body: IProjeto = await request.json();

    // Criando manualmente um ID simples e definindo a data de criação
    const novoProjeto: Partial<IProjeto> = {
      nome: body.nome,
      descricao: body.descricao,
      tecnologias: body.tecnologias,
      linkGit: body.linkGit,          // Opcional
      linkAcesso: body.linkAcesso,    // Opcional
      dataCriacao: new Date().toISOString()  // Formato ISO
    };

    // Conectando ao MongoDB
    const client = await getMongoClient();
    const db = client.db('joaoitoBlog');
    
    // Acessando a collection 'projects'
    const collection = db.collection('projects');

    // Inserindo o novo projeto na collection
    await collection.insertOne(novoProjeto);

    // Retornando o novo projeto salvo como resposta
    return new Response(JSON.stringify({ message: 'Projeto criado com sucesso', novoProjeto }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    // Tratamento de erros
    return new Response(JSON.stringify({ error: 'Erro ao criar projeto', details: error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
