import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import usuarioController from './controller/usuarioController.js';
import psicologoController from './controller/usuarioController.js';
import consultaController from './controller/usuarioController.js';

// Criação da aplicação Express
const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas (controllers)
app.use(usuarioController);
app.use(psicologoController);
app.use(consultaController);

// Inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`API online na porta ${PORT}`);
});
