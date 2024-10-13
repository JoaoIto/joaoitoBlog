// app/api/projetos/route.ts

import { IArticle } from "@/app/interfaces/IArticles";
import { getMongoClient } from "../database/connection";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    // Conectando ao MongoDB
    const client = await getMongoClient();
    const db = client.db('joaoitoBlog');
    
    // Acessando a collection 'projects'
    const collection = db.collection('articles');

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
    const body: IArticle = await request.json();

    // Criando manualmente um ID simples e definindo a data de criação
    const novoProjeto: Partial<IArticle> = {
      nome: body.nome,
      descricao: body.descricao, 
      areaEstudo: body.areaEstudo,     // Opcional
      linkAcesso: body.linkAcesso,    // Opcional
      dataPublicacao: new Date().toISOString()  // Formato ISO
    };

    // Conectando ao MongoDB
    const client = await getMongoClient();
    const db = client.db('joaoitoBlog');
    
    // Acessando a collection 'projects'
    const collection = db.collection('articles');

    // Inserindo o novo projeto na collection
    await collection.insertOne(novoProjeto);

    // Retornando o novo projeto salvo como resposta
    return new Response(JSON.stringify({ message: 'Artigo criado com sucesso', novoProjeto }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    // Tratamento de erros
    return new Response(JSON.stringify({ error: 'Erro ao criar artigo', details: error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function PUT(request: Request, { params }: { params: { id?: string } }) {
    try {
      // Lê os dados do corpo da requisição
      const { id: bodyId, ...updateData }: Partial<IArticle> = await request.json();
      
      // Prioriza o ID da rota, caso exista, senão usa o do corpo
      const id = params.id || bodyId;
      
      if (!id) {
        return new Response(JSON.stringify({ message: 'ID não fornecido.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
  
      // Conectando ao MongoDB
      const client = await getMongoClient();
      const db = client.db('joaoitoBlog');
      const collection = db.collection('articles');
  
      // Atualizando o artigo pelo ID
      const result = await collection.updateOne(
        { _id: new ObjectId(id) }, 
        { $set: updateData }
      );
  
      if (result.modifiedCount === 0) {
        return new Response(JSON.stringify({ message: 'Artigo não encontrado ou nada foi alterado.' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }
  
      // Confirmação de atualização
      return new Response(JSON.stringify({ message: 'Artigo atualizado com sucesso.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Erro ao atualizar artigo', details: error }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
}
  

export async function DELETE(request: Request, { params }: { params: { id?: string } }) {
    try {
      // Lê os dados do corpo da requisição
      const { id: bodyId }: { id?: string } = await request.json().catch(() => ({}));
  
      // Prioriza o ID da rota, caso exista, senão usa o do corpo
      const id = params.id || bodyId;
      
      if (!id) {
        return new Response(JSON.stringify({ message: 'ID não fornecido.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
  
      // Conectando ao MongoDB
      const client = await getMongoClient();
      const db = client.db('joaoitoBlog');
      const collection = db.collection('articles');
  
      // Removendo o artigo pelo ID
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
  
      if (result.deletedCount === 0) {
        return new Response(JSON.stringify({ message: 'Artigo não encontrado.' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }
  
      // Confirmação de remoção
      return new Response(JSON.stringify({ message: 'Artigo removido com sucesso.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Erro ao remover artigo', details: error }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
}
  
