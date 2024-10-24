// app/api/projetos/route.ts

import { IProjeto } from "@/app/interfaces/IProjeto";
import { getMongoClient } from "../database/connection";
import { ObjectId } from "mongodb";
import { corsHeaders } from "@/app/functions/corsHeaders";

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
    const client = await getMongoClient();
    const db = client.db('joaoitoBlog');
    const collection = db.collection('projects');
    const projects = await collection.find({}).toArray();

    return new Response(JSON.stringify(projects), {
      status: 200,
      headers: corsHeaders()
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: corsHeaders()
    });
  }
}

export async function POST(request: Request) {
  try {
    const body: IProjeto = await request.json();
    const novoProjeto: Omit<IProjeto, "_id"> & { _id: ObjectId } = {
      _id: new ObjectId(),
      nome: body.nome,
      descricao: body.descricao,
      titulos: body.titulos,
      tecnologias: body.tecnologias,
      linkGit: body.linkGit,
      linkAcesso: body.linkAcesso,
      dataPostagem: new Date().toISOString(),
      dataCriacao: body.dataCriacao
    };

    const client = await getMongoClient();
    const db = client.db('joaoitoBlog');
    const collection = db.collection('projects');
    await collection.insertOne(novoProjeto);

    return new Response(JSON.stringify({ message: 'Projeto criado com sucesso', novoProjeto }), {
      status: 201,
      headers: corsHeaders()
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao criar projeto', details: error }), {
      status: 500,
      headers: corsHeaders()
    });
  }
}

export async function PUT(request: Request) {
  try {
    const { _id, ...updateData }: Partial<IProjeto> = await request.json();
    const client = await getMongoClient();
    const db = client.db('joaoitoBlog');
    const collection = db.collection('projects');
    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
      return new Response(JSON.stringify({ message: 'Projeto não encontrado ou nada foi alterado.' }), {
        status: 404,
        headers: corsHeaders()
      });
    }

    return new Response(JSON.stringify({ message: 'Projeto atualizado com sucesso.' }), {
      status: 200,
      headers: corsHeaders()
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao atualizar projeto', details: error }), {
      status: 500,
      headers: corsHeaders()
    });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id }: { id: string } = await request.json();
    const client = await getMongoClient();
    const db = client.db('joaoitoBlog');
    const collection = db.collection('projects');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ message: 'Projeto não encontrado.' }), {
        status: 404,
        headers: corsHeaders()
      });
    }

    return new Response(JSON.stringify({ message: 'Projeto removido com sucesso.' }), {
      status: 200,
      headers: corsHeaders()
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao remover projeto', details: error }), {
      status: 500,
      headers: corsHeaders()
    });
  }
}