import { IArticle } from "@/app/interfaces/IArticles";
import { ObjectId } from "mongodb";
import { getMongoClient } from "../../database/connection";

// Função GET para buscar todos os artigos
export async function GET() {
  try {
    const client = await getMongoClient();
    const db = client.db('novoBanco');
    const collection = db.collection('articles');

    // Buscando todos os artigos
    const articles = await collection.find({}).toArray();

    return new Response(JSON.stringify({ articles }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao buscar artigos', details: error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Função POST para criar um novo artigo
export async function POST(request: Request) {
  try {
    const body: IArticle = await request.json();
    
    const novoArtigo: Partial<IArticle> = {
      nome: body.nome,
      descricao: body.descricao,
      areaEstudo: body.areaEstudo,
      linkAcesso: body.linkAcesso,
      dataPublicacao: new Date().toISOString(),
    };

    const client = await getMongoClient();
    const db = client.db('novoBanco');
    const collection = db.collection('articles');

    await collection.insertOne({
      ...novoArtigo,
      _id: new ObjectId(novoArtigo._id) // Garante que _id seja ObjectId
    });

    return new Response(JSON.stringify({ message: 'Artigo criado com sucesso', novoArtigo }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao criar artigo', details: error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Função PUT para atualizar um artigo por ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const updateData: Partial<IArticle> = await request.json();

    const client = await getMongoClient();
    const db = client.db('novoBanco');
    const collection = db.collection('articles');

    const result = await collection.updateOne(
      { _id: new ObjectId(params.id) }, 
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
      return new Response(JSON.stringify({ message: 'Artigo não encontrado ou nada foi alterado.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

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

// Função DELETE para remover um artigo por ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await getMongoClient();
    const db = client.db('novoBanco');
    const collection = db.collection('articles');

    const result = await collection.deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ message: 'Artigo não encontrado.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

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
