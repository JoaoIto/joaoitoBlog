import { corsHeaders } from "@/app/functions/corsHeaders";
import { getMongoClient } from "../database/connection";

export async function GET() {
  try {
    const client = await getMongoClient();
    const db = client.db('joaoitoBlog');
    const collection = db.collection('certifications');
    const certs = await collection.find({}).toArray();

    return new Response(JSON.stringify(certs), {
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
