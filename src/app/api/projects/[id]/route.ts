import { getMongoClient } from "../../database/connection";
import { ObjectId } from "mongodb";

// Função para tratar requisições GET para obter um projeto por ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Conectando ao MongoDB
    const client = await getMongoClient();
    const db = client.db('joaoitoBlog');

    // Acessando a collection 'projects'
    const collection = db.collection('projects');

    // Buscando o projeto pelo ID
    const project = await collection.findOne({ _id: new ObjectId(params.id) });

    if (!project) {
      return new Response(JSON.stringify({ message: 'Projeto não encontrado.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Retornando o projeto encontrado
    return new Response(JSON.stringify(project), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao buscar projeto', details: error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Função para tratar requisições DELETE para remover um projeto por ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Conectando ao MongoDB
    const client = await getMongoClient();
    const db = client.db('joaoitoBlog');

    // Acessando a collection 'projects'
    const collection = db.collection('projects');

    // Removendo o projeto pelo ID
    const result = await collection.deleteOne({ _id: new ObjectId(params.id) });

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
    return new Response(JSON.stringify({ error: 'Erro ao remover projeto', details: error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Função PUT para atualizar um projeto por ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
      const updateData = await request.json(); // Recebendo os dados enviados na requisição
  
      // Conectando ao MongoDB
      const client = await getMongoClient();
      const db = client.db('joaoitoBlog');
  
      // Acessando a collection 'projects'
      const collection = db.collection('projects');
  
      // Atualizando o projeto pelo ID, utilizando $set para atualizar somente os campos enviados
      const result = await collection.updateOne(
        { _id: new ObjectId(params.id) }, // Identificando o projeto pelo ID
        { $set: updateData }  // Atualizando apenas os campos fornecidos
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
      return new Response(JSON.stringify({ error: 'Erro ao atualizar projeto', details: error }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
