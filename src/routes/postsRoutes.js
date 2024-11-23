import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controller/postsController.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento para os arquivos enviados
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Caminho para a pasta 'uploads'
  },
  // Define o nome do arquivo utilizando o nome original
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Mantém o nome original do arquivo
  }
});

// Define o middleware multer para upload de arquivos
const upload = multer({ dest: "./uploads", storage }); // Utiliza o storage configurado

// Função para configurar as rotas da aplicação
const routes = (app) => {
  // Habilita o parsing de JSON no corpo das requisições HTTP
  app.use(express.json()); // Permite interpretar dados JSON enviados na requisição

  app.use(cors(corsOptions))
  // Rota para buscar todos os posts (GET /posts)
  app.get("/posts", listarPosts); // Chama a função listarPosts para buscar os posts

  // Rota para criar um novo post (POST /posts)
  app.post("/posts", postarNovoPost); // Chama a função postarNovoPost para criar um post

  // Rota para upload de imagem (POST /upload)
  app.post("/upload", upload.single("imagem"), uploadImagem); 
    // Utiliza o middleware multer para upload de um único arquivo chamado 'imagem'
    // Chama a função uploadImagem para processar a imagem enviada

  app.put("/upload/:id", atualizarNovoPost)
};

export default routes; // Exporta a função routes para ser utilizada em outros arquivos