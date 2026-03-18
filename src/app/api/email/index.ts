import { IMessageEmail } from '@/app/interfaces/IMessageEmail';
import nodemailer from 'nodemailer';

// Configuração do transporte de email

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
export const sendEmail = async (data: IMessageEmail) => {
    const mailOptions = {
      from: process.env.EMAIL_USER, // O envio deve ser feito pelo usuário autenticado
      to: 'joaovictorpfr@gmail.com',
      replyTo: data.email, // Responder diretamente para quem enviou a mensagem
      subject: `[Portfólio] Nova mensagem de ${data.nome}`,
      text: `
        Nome: ${data.nome}
        Email: ${data.email}
        
        Mensagem: 
        ${data.mensagem}
      `,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar o email:', error);
    }
  };