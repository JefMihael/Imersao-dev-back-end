import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados MongoDB usando a string de conexão fornecida como variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts do banco de dados
export default async function getTodosPosts() {
    const db = conexao.db("Imersão-instabytes");
    const colecao = db.collection("Posts");
  
    return colecao.find().toArray();
}