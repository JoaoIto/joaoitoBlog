import { IMessageEmail } from "@/app/interfaces/IMessageEmail";
import { sendEmail } from ".";

// Função POST da rota API
export async function POST(request: Request) {
    try {
      const body: IMessageEmail = await request.json(); // Obter os dados do corpo da requisição
      await sendEmail(body); // Enviar o email com os dados do formulário
  
      return Response.json({ message: 'Email enviado com sucesso!' }, { status: 200 });
    } catch (error) {
        // Retorna uma resposta de erro com status 500
        return new Response(JSON.stringify({ error: 'Falha ao enviar o email', details: String(error) }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
  }