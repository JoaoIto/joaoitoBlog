import { IMessageEmail } from '@/app/interfaces/IMessageEmail';
import nodemailer from 'nodemailer';

// Configuração do transporte de email

const transporter = nodemailer.createTransport({
    service: 'gmail', // Pode usar outro serviço como SendGrid, etc.
    auth: {
      user: 'seuemail@gmail.com',
      pass: 'suasenha',
    },
  });
  
export const sendEmail = async (data: IMessageEmail) => {
    const mailOptions = {
      from: data.email, // De quem está enviando (o email do formulário)
      to: 'joaovictorpfr@gmail.com', // Seu email para receber os dados do formulário
      subject: 'Nova mensagem do formulário de contato',
      text: `
        Nome: ${data.nome}
        Email: ${data.email}
        Mensagem: ${data.mensagem}
      `,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar o email:', error);
    }
  };