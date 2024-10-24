// app/api/articles/route.ts

import { IArticle } from "@/app/interfaces/IArticles";
import { getMongoClient } from "../database/connection";
import { ObjectId } from "mongodb";

// Função GET
export async function GET() {
  try {
    const client = await getMongoClient();
    const db = client.db('joaoitoBlog');
    const collection = db.collection('articles');
    const articles = await collection.find({}).toArray();

    return new Response(JSON.stringify(articles), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // Permitir requisições de qualquer origem
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // Permitir requisições de qualquer origem
      }
    });
  }
}

// Função POST
export async function POST(request: Request) {
  try {
    const body: Omit<IArticle, "_id" | "createdAt" | "updatedAt"> = await request.json();
    const novoArticle: Omit<IArticle, "_id"> & { _id: ObjectId } = {
      _id: new ObjectId(),
      nome: body.nome,
      descricao: body.descricao,
      areaEstudo: body.areaEstudo,
      dataPublicacao: body.dataPublicacao,
      dataPostagem: new Date().toISOString(),
      linkAcesso: body.linkAcesso
    };

    const client = await getMongoClient();
    const db = client.db('joaoitoBlog');
    const collection = db.collection('articles');

    await collection.insertOne(novoArticle);

    return new Response(JSON.stringify({ message: 'Artigo criado com sucesso', novoArticle }), {
      status: 201,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // Permitir requisições de qualquer origem
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao criar artigo', details: error }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // Permitir requisições de qualquer origem
      }
    });
  }
}

// Função PUT
export async function PUT(request: Request, { params }: { params: { id?: string } }) {
  try {
    const { _id: bodyId, ...updateData }: Partial<IArticle> = await request.json();
    const id = params.id || bodyId;

    if (!id) {
      return new Response(JSON.stringify({ message: 'ID não fornecido.' }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' // Permitir requisições de qualquer origem
        }
      });
    }

    const client = await getMongoClient();
    const db = client.db('joaoitoBlog');
    const collection = db.collection('articles');

    const result = await collection.updateOne(
      { _id: new ObjectId(id) }, 
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
      return new Response(JSON.stringify({ message: 'Artigo não encontrado ou nada foi alterado.' }), {
        status: 404,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' // Permitir requisições de qualquer origem
        }
      });
    }

    return new Response(JSON.stringify({ message: 'Artigo atualizado com sucesso.' }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // Permitir requisições de qualquer origem
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao atualizar artigo', details: error }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // Permitir requisições de qualquer origem
      }
    });
  }
}

// Função DELETE
export async function DELETE(request: Request, { params }: { params: { id?: string } }) {
  try {
    const { id: bodyId }: { id?: string } = await request.json().catch(() => ({}));
    const id = params.id || bodyId;

    if (!id) {
      return new Response(JSON.stringify({ message: 'ID não fornecido.' }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' // Permitir requisições de qualquer origem
        }
      });
    }

    const client = await getMongoClient();
    const db = client.db('joaoitoBlog');
    const collection = db.collection('articles');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ message: 'Artigo não encontrado.' }), {
        status: 404,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' // Permitir requisições de qualquer origem
        }
      });
    }

    return new Response(JSON.stringify({ message: 'Artigo removido com sucesso.' }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // Permitir requisições de qualquer origem
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao remover artigo', details: error }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // Permitir requisições de qualquer origem
      }
    });
  }
}
