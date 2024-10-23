import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let clientPromise: Promise<MongoClient>;
export async function getMongoClient() {
  try {
    const client = await clientPromise;
    console.log("Conexão ao MongoDB estabelecida com sucesso!");
    return client;
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    throw error;
  }
}