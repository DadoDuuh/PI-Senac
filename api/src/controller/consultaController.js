import { Router } from 'express';
import { listarConsultas, agendarConsulta } from '../repository/consultaRepository.js';
import { findUsuarioById } from '../repository/usuarioRepository.js';
import { findPsicologoById } from '../repository/psicologoRepository.js';

const router = Router();

router.get('/listar', async (req, res) => {
  try {
      const consultas = await listarConsultas();
      res.json(consultas);
  } catch (error) {
      res.status(500).send(error.message);
  }
});

router.post('/agendar', async (req, res) => {
  try {
      const { pacienteId, psicologoId, dataHora } = req.body;

      const paciente = await findUsuarioById(pacienteId);
      if (!paciente) {
          return res.status(400).json({ error: 'Paciente não encontrado' });
      }

      const psicologo = await findPsicologoById(psicologoId);
      if (!psicologo) {
          return res.status(400).json({ error: 'Psicólogo não encontrado' });
      }

      const novaConsulta = {
          pacienteId,
          psicologoId,
          dataHora: new Date(dataHora)
      };

      const id = await agendarConsulta(novaConsulta);
      res.status(201).json({ id });
  } catch (error) {
      res.status(500).send(error.message);
  }
});

export default router;