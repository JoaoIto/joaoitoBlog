import { ObjectId } from "mongodb";

export interface IArticle {
    _id: string | ObjectId;
    nome: string;
    descricao: string;
    areaEstudo: string;
    dataPublicacao: Date | string;
    dataPostagem: Date | string;
    linkAcesso: string;
}


