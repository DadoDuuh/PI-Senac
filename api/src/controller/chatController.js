import { Router } from 'express';

import { buscarMensagens, InserirMensagem, criarChat, buscarChat, buscarCoversas } from '../repository/chatRepository.js';

const router = Router();

router.get('/buscar/mensagens/:pacienteId/:psicologoId/:chatId', async (req, res) => {
    try {
        const { pacienteId, psicologoId, chatId } = req.params;
        const chat = await buscarMensagens({ pacienteId, psicologoId, chatId });
        res.json(chat);
    }
    catch (error) {
        console.error("Erro ao buscar mensagens:", error);
        res.status(500).json({ error: error.message });
    }
});


router.post('/enviar', async (req, res) => {
    try {
        const { sender, chat_id, mensagem } = req.body;
         
        if (!chat_id) {
            res.status(404).json({ error: "chat_id é obrigatório." });
        }

        const result = await InserirMensagem({ sender, chat_id, mensagem });
        res.status(201).json(result);
    }
    catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/buscar/chat/:pacienteId/:psicologoId', async (req, res) => {
    try {
        const { pacienteId, psicologoId } = req.params;
        const chat = await buscarChat({ pacienteId, psicologoId });
        res.json(chat);
    }
    catch (error) {
        console.error("Erro ao buscar chat:", error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/criar', async (req, res) => {
    try {
        const { paciente_id, psicologo_id } = req.body;

        const result = await criarChat({ paciente_id, psicologo_id });
        res.status(201).json(result);
    }
    catch (error) {
        console.error("Erro ao criar chat:", error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/buscar/conversas/:pacienteId/:psicologoId', async (req, res) => {
    try {
        const { pacienteId, psicologoId } = req.params;

        const result = await buscarCoversas({ pacienteId, psicologoId });
        res.json(result);
    }
    catch (error) {
        console.error("Erro ao buscar conversas:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;