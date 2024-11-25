import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados MongoDB usando a string de conexão fornecida como variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts do banco de dados
export async function getTodosPosts() {
    const db        = conexao.db("Imersão-instabytes");
    const colecao   = db.collection("Posts");
  
    return colecao.find().toArray();
}

// Função assíncrona para criar um novo post no banco de dados
export async function criarPost(novoPost) {
    const db        = conexao.db("Imersão-instabytes");
    const colecao   = db.collection("Posts");
  
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    const db        = conexao.db("Imersão-instabytes");
    const colecao   = db.collection("Posts");
    const objID     = ObjectId.createFromHexString(id)

    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}