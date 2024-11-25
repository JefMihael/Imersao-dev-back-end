import express from "express";
import multer from "multer";
import { atualizarNovoPost, listarPosts, novoPost, uploadImagem } from "../controller/postsController.js";

// Configura o armazenamento dos arquivos em disco
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },

  // Define o nome do arquivo no destino
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Cria uma instância do multer com as configurações de armazenamento
const upload = multer({ dest: "./uploads", storage });

const routes = (app) => {
    // Habilita o parsing de JSON no corpo das requisições
    app.use(express.json());

    // Rota para buscar todos os posts
    app.get("/posts", listarPosts);

    // Rota para criar um post
    app.post("/posts", novoPost);

    // Define uma rota "/upload" 
    // O middleware `upload.single("imagem")` configura o Multer para lidar com o upload de um único arquivo com o nome "imagem" no formulário. 
    app.post("/upload", upload.single("imagem"), uploadImagem);

    // Define uma rota para atualizar novos posts
    app.put("/upload/:id", atualizarNovoPost);
}

export default routes;