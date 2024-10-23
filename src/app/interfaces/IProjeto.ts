import { ObjectId } from "mongodb";

export interface IProjeto {
  _id: string | ObjectId; // ID do projeto (gerado automaticamente)
  nome: string; // Nome do projeto
  descricao: string; // Descrição do projeto
  tecnologias: string[]; // Lista de tecnologias usadas no projeto
  titulos: string[];
  linkGit?: string; // Link para o repositório GitHub (opcional)
  linkAcesso?: string; // Link para acessar o projeto online (opcional)
  dataPostagem: Date | string; // Data de postagem na plataforma do projeto
  dataCriacao: Date | string; // Data de criação ou finalização do projeto
}
