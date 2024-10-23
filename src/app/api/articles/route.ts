// app/api/projetos/route.ts

import { IArticle } from "@/app/interfaces/IArticles";
import { getMongoClient } from "../database/connection";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    // Conectando ao MongoDB
    const client = await getMongoClient();
    const db = client.db('novoBanco');
    
    // Acessando a collection 'articles'
    const collection = db.collection('articles');

    // Buscando todos os artigos
    const articles = await collection.find({}).toArray();

    // Retornando apenas o array de artigos
    return new Response(JSON.stringify(articles), {
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
    const body: Omit<IArticle, "_id" | "createdAt" | "updatedAt"> = await request.json();

    // Criando um novo artigo com ID e definindo as datas
    const novoArticle: Omit<IArticle, "_id"> & { _id: ObjectId } = {
      _id: new ObjectId(), // Criando um novo ObjectId
      nome: body.nome,
      descricao: body.descricao,
      areaEstudo: body.areaEstudo,
      dataPublicacao: body.dataPublicacao,
      dataPostagem: new Date().toISOString(), // Data de postagem
      linkAcesso: body.linkAcesso
    };

    // Conectando ao MongoDB
    const client = await getMongoClient();
    const db = client.db('novoBanco');
    
    // Acessando a collection 'articles'
    const collection = db.collection('articles');

    // Inserindo o novo artigo na collection
    await collection.insertOne(novoArticle);

    // Retornando o novo artigo salvo como resposta
    return new Response(JSON.stringify({ message: 'Artigo criado com sucesso', novoArticle }), {
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
      const { _id: bodyId, ...updateData }: Partial<IArticle> = await request.json();
      
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
      const db = client.db('novoBanco');
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
      const db = client.db('novoBanco');
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
  
