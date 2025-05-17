const express = require('express');
import { listarConsultas, agendarConsulta } from '../repository/consultaRepository.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
      const consultas = await listarConsultas();
      res.json(consultas);
  } catch (error) {
      res.status(500).send(error.message);
  }
});

router.post('/agendar', async (req, res) => {
  try {
      const novaConsulta = {
          pacienteId: req.body.pacienteId,
          psicologoId: req.body.psicologoId,
          dataHora: new Date(req.body.dataHora)
      };

      const id = await agendarConsulta(novaConsulta);
      res.status(201).json({ id });
  } catch (error) {
      res.status(500).send(error.message);
  }
});

export default router;