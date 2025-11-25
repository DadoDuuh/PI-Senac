import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import usuarioController from "./src/controller/usuarioController.js";
import pacienteController from './src/controller/pacienteController.js';
import psicologoController from './src/controller/psicologoController.js';
import consultaController from './src/controller/consultaController.js';
import anotacaoController from './src/controller/anotacaoController.js';
import chatController from './src/controller/chatController.js';

// Criação da aplicação Express
const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// LOG de todas as requisições
app.use((req, res, next) => {
    console.log(`📥 ${req.method} ${req.url}`);
    console.log('Body:', req.body);
    next();
});

// Rotas (controllers)
app.use('/usuarios', usuarioController);
app.use('/pacientes', pacienteController);
app.use('/psicologos', psicologoController);
app.use('/consultas', consultaController);
app.use('/anotacoes', anotacaoController);
app.use('/chat', chatController);

// Rota 200 OK
app.get('/health', (req, res) => {
    res.status(200).send('API está funcionando');
});

// Rota de erro 404
app.use((req, res) => {
    console.log('404 - Rota não encontrada:', req.url);
    res.status(404).send('Rota não encontrada');
});

// Rota de erro 500
app.use((err, req, res, next) => {
    console.error('ERRO 500:', err.stack);
    res.status(500).send('Erro interno do servidor');
});

// Inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
});
