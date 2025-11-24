import { Router } from 'express';

import { buscarAnotacoes, alterarAnotacao, inserirAnotacao } from '../repository/anotacaoRepository.js';

const router = Router();

router.get('/buscar/:idPaciente/:idConsulta/:idPsicologo', async (req, res) => {
    try {
        const { idPaciente, idConsulta, idPsicologo } = req.params;
        const descricao = await buscarAnotacoes({ idPaciente, idConsulta, idPsicologo });
        res.json(descricao);
    }
    catch (error) {
        console.error("Erro ao buscar anotações:", error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/inserir', (req, res) => {
    try {
        const descricao = req.body;
        const idAnotacao = inserirAnotacao(descricao);
        res.status(201).json({ idAnotacao });
    }
    catch (error) {
        console.error("Erro ao inserir anotação:", error);
        res.status(500).json({ error: error.message });
    }
});

router.put('/alterar', (req, res) => {
    try {
        const descricao = req.body;

        const sucesso = alterarAnotacao(descricao);

        res.json({ sucesso });
    } catch (error) {
        console.error("Erro ao alterar anotação:", error);
        res.status(500).json({ error: error.message });
    }
})

export default router;