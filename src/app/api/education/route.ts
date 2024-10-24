// app/api/education/route.ts

import { IEducation } from "@/app/interfaces/IEducation";
import { getMongoClient } from "../database/connection";
import { ObjectId } from "mongodb";

// Função GET
export async function GET() {
  try {
    const client = await getMongoClient();
    const db = client.db('joaoitoBlog');
    const collection = db.collection('educations');

    const educacao = await collection.find({}).toArray();

    return new Response(JSON.stringify(educacao), {
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
    const body: Omit<IEducation, "_id"> = await request.json();

    const novaEducacao: IEducation = {
      _id: new ObjectId(),
      instituicao: body.instituicao,
      curso: body.curso,
      periodo: body.periodo,
      descricao: body.descricao
    };

    const client = await getMongoClient();
    const db = client.db('joaoitoBlog');
    const collection = db.collection('educations');

    await collection.insertOne({
        ...novaEducacao,
        _id: new ObjectId(novaEducacao._id) // Garante que _id seja ObjectId
      });

    return new Response(JSON.stringify({ message: 'Educação criada com sucesso', novaEducacao }), {
      status: 201,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // Permitir requisições de qualquer origem
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao criar educação', details: error }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // Permitir requisições de qualquer origem
      }
    });
  }
}
