import { ObjectId } from "mongodb";

export interface IExperience {
    _id: string | ObjectId;
    cargo: string;
    empresa: string;
    periodo: string;
    descricao: string;
    tecnologias: string[];
}


