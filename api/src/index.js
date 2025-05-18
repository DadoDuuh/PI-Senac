import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import usuarioController from './controller/usuarioController.js';
import psicologoController from './controller/psicologoController.js';
import consultaController from './controller/consultaController.js';

// Criação da aplicação Express
const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas (controllers)
app.use('/usuarios', usuarioController);
app.use('/psicologos', psicologoController);
app.use('/consultas', consultaController);

// Rota 200 OK
app.get('/health', (req, res) => {
    res.status(200).send('API está funcionando');
});

// Rota de erro 404
app.use((req, res) => {
    res.status(404).send('Rota não encontrada');
});

// Rota de erro 500
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Erro interno do servidor');
});

// Inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
