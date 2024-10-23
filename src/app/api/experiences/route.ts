// app/api/experiencias/route.ts

import { IExperience } from "@/app/interfaces/IExperiences";
import { getMongoClient } from "../database/connection";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await getMongoClient();
    const db = client.db('novoBanco');
    const collection = db.collection('experiences');

    const experiencias = await collection.find({}).toArray();

    return new Response(JSON.stringify(experiencias), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
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
      const db = client.db('novoBanco');
      const collection = db.collection('experiences');
  
      await collection.insertOne({
        ...novaExperiencia,
        _id: new ObjectId(novaExperiencia._id) // Garante que _id seja ObjectId
      });
  
      return new Response(JSON.stringify({ message: 'Experiência criada com sucesso', novaExperiencia }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });
  
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Erro ao criar experiência', details: error }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

// Adicione as funções PUT e DELETE similares às do arquivo de artigos