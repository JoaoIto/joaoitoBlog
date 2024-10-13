import { MongoClient } from "mongodb";

export function getMongoClient(){
    const client = MongoClient.connect("mongodb://localhost:27017")
    return client;
}
