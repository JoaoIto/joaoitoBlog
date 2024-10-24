// app/api/experiencias/route.ts

import { IExperience } from "@/app/interfaces/IExperiences";
import { getMongoClient } from "../database/connection";
import { ObjectId } from "mongodb";
import { corsHeaders } from "@/app/functions/corsHeaders";

export async function GET() {
  try {
    const client = await getMongoClient();
    const db = client.db('joaoitoBlog');
    const collection = db.collection('experiences');

    const experiencias = await collection.find({}).toArray();

    return new Response(JSON.stringify(experiencias), {
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
    const body: Omit<IExperience, "_id"> = await request.json();

    // Crie a nova experiência com um ObjectId como _id
    const novaExperiencia: IExperience = {
      _id: new ObjectId(), 
      cargo: body.cargo,
      empresa: body.empresa,
      periodo: body.periodo,
      descricao: body.descricao,
      tecnologias: body.tecnologias
    };

    const client = await getMongoClient();
    const db = client.db('joaoitoBlog');
    const collection = db.collection('experiences');

    await collection.insertOne({
      ...novaExperiencia,
      _id: new ObjectId(novaExperiencia._id) // Garante que _id seja ObjectId
    });

    return new Response(JSON.stringify({ message: 'Experiência criada com sucesso', novaExperiencia }), {
      status: 201,
      headers: corsHeaders()
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao criar experiência', details: error }), {
      status: 500,
      headers: corsHeaders()
    });
  }
}

// Função PUT com CORS
export async function PUT(request: Request, { params }: { params: { id?: string } }) {
  try {
    const { _id: bodyId, ...updateData }: Partial<IExperience> = await request.json();
    const id = params.id || bodyId;

    if (!id) {
      return new Response(JSON.stringify({ message: 'ID não fornecido.' }), {
        status: 400,
        headers: corsHeaders()
      });
    }

    const client = await getMongoClient();
    const db = client.db('joaoitoBlog');
    const collection = db.collection('experiences');

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
      return new Response(JSON.stringify({ message: 'Experiência não encontrada ou nada foi alterado.' }), {
        status: 404,
        headers: corsHeaders()
      });
    }

    return new Response(JSON.stringify({ message: 'Experiência atualizada com sucesso.' }), {
      status: 200,
      headers: corsHeaders()
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao atualizar experiência', details: error }), {
      status: 500,
      headers: corsHeaders()
    });
  }
}

// Função DELETE com CORS
export async function DELETE(request: Request, { params }: { params: { id?: string } }) {
  try {
    const { id: bodyId }: { id?: string } = await request.json().catch(() => ({}));
    const id = params.id || bodyId;

    if (!id) {
      return new Response(JSON.stringify({ message: 'ID não fornecido.' }), {
        status: 400,
        headers: corsHeaders()
      });
    }

    const client = await getMongoClient();
    const db = client.db('joaoitoBlog');
    const collection = db.collection('experiences');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ message: 'Experiência não encontrada.' }), {
        status: 404,
        headers: corsHeaders()
      });
    }

    return new Response(JSON.stringify({ message: 'Experiência removida com sucesso.' }), {
      status: 200,
      headers: corsHeaders()
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao remover experiência', details: error }), {
      status: 500,
      headers: corsHeaders()
    });
  }
}