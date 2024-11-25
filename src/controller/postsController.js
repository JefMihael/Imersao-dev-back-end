import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import fs from "fs"

export async function listarPosts(req, res) {
    // Busca todos os posts do banco de dados
    const posts = await getTodosPosts();

    // Envia os posts como resposta em formato JSON
    res.status(200).json(posts);
}
  
export async function novoPost(req, res) {
    // Obtém os dados do novo post do corpo da requisição
    const novoPost = req.body;

    try {
        // Cria um novo post no banco de dados
        const postCriado = await criarPost(novoPost);

        // Envia o post criado como resposta em formato JSON
        res.status(200).json(postCriado);
    } catch (e) {
        // Loga o erro no console
        console.error(e.message);

        // Envia uma resposta de erro ao cliente
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

//Mesmo processo da função acima com uma diferença na constante novoPost
export async function uploadImagem(req, res){

    //cria um corpo para a imagem que será publicada
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    }

    try{
        const postCriado    = await criarPost(novoPost);
        const imgAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imgAtualizada)
        res.status(200).json(postCriado);
    } catch(e) {
        console.error(e.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

export async function atualizarNovoPost(req, res) {
    // Requisição de dados e preparacão para a atuaização
    const id        = req.params.id;
    const urlImg    = `http://localhost:3000/${id}.png`
    const post      = {
        imgUrl:     urlImg,
        descricao:  req.body.descricao,
        alt:        req.body.alt
    }

    try {
        // Atualiza o post no banco de dados
        const postCriado = await atualizarPost(id, post);

        // Envia o post criado como resposta em formato JSON
        res.status(200).json(postCriado);
        
    } catch (e) {
        // Loga o erro no console
        console.error(e.message);

        // Envia uma resposta de erro ao cliente
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}