// app/api/projetos/route.ts

import { IProjeto } from "@/app/interfaces/IProjeto";
import { getMongoClient } from "../database/connection";
import { ObjectId } from "mongodb";

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
    const db = client.db('novoBanco');
    
    // Acessando a collection 'projects'
    const collection = db.collection('projects');

    // Buscando todos os projetos
    const projects = await collection.find({}).toArray();

    // Retornando apenas o array de projetos
    return new Response(JSON.stringify(projects), {
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

    // Criando um novo projeto com ID e definindo a data de criação
    const novoProjeto: Omit<IProjeto, "_id"> & { _id: ObjectId } = {
      _id: new ObjectId(), // Criando um novo ObjectId
      nome: body.nome,
      descricao: body.descricao,
      tecnologias: body.tecnologias,
      linkGit: body.linkGit,      
      linkAcesso: body.linkAcesso,    
      dataPostagem: new Date().toISOString(),  
      dataCriacao: body.dataCriacao
    };

    // Conectando ao MongoDB
    const client = await getMongoClient();
    const db = client.db('novoBanco');
    
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

export async function PUT(request: Request) {
  try {
    // Lê os dados do corpo da requisição
    const { _id, ...updateData }: Partial<IProjeto> = await request.json();

    // Conectando ao MongoDB
    const client = await getMongoClient();
    const db = client.db('novoBanco');

    // Acessando a collection 'projects'
    const collection = db.collection('projects');

    // Atualizando o projeto pelo ID
    const result = await collection.updateOne(
      { _id: new ObjectId(_id) }, // Utilizando ObjectId do MongoDB
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
      return new Response(JSON.stringify({ message: 'Projeto não encontrado ou nada foi alterado.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Retornando a confirmação de atualização
    return new Response(JSON.stringify({ message: 'Projeto atualizado com sucesso.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    // Tratamento de erros
    return new Response(JSON.stringify({ error: 'Erro ao atualizar projeto', details: error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function DELETE(request: Request) {
  try {
    // Lê os dados do corpo da requisição
    const { id }: { id: string } = await request.json();

    // Conectando ao MongoDB
    const client = await getMongoClient();
    const db = client.db('novoBanco');

    // Acessando a collection 'projects'
    const collection = db.collection('projects');

    // Removendo o projeto pelo ID
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ message: 'Projeto não encontrado.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Retornando a confirmação de remoção
    return new Response(JSON.stringify({ message: 'Projeto removido com sucesso.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    // Tratamento de erros
    return new Response(JSON.stringify({ error: 'Erro ao remover projeto', details: error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
