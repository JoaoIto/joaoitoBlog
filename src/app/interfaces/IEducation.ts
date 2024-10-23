import { ObjectId } from "mongodb";

export interface IEducation {
    _id: string | ObjectId;
    instituicao: string;
    curso: string;
    periodo: string;
    descricao: string;
}


