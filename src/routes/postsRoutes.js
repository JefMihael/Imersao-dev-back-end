import express from "express"
import { listarPosts } from "../controller/postsController.js";

const routes = (app) => {
    // Habilita o parsing de JSON no corpo das requisições
    app.use(express.json());

    // Rota para buscar todos os posts
    app.get("/posts", listarPosts);
}

export default routes;




/*
function buscarPostPorId(id){
    return posts.findIndex((post) => { return post.id === Number(id) })
}

app.get("/posts/:id", (req, res) => {
    const index = buscarPostPorId(req.params.id);
    res.status(200).json(posts[index]);
});
*/