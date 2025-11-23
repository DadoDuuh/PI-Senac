import { Router } from 'express';
import { listarConsultas, agendarConsulta, getConsultasByPaciente, getSolicitacoesByPsicologo, confirmarConsulta,
    cancelarConsulta } from '../repository/consultaRepository.js';
import { findPacienteByUsuarioId } from '../repository/pacienteRepository.js';
import { findPsicologoByUsuarioId } from '../repository/psicologoRepository.js';

const router = Router();

// Listar consultas
router.get('/listar', async (req, res) => {
  try {
      const consultas = await listarConsultas();
      res.json(consultas);
  } catch (error) {
      res.status(500).send(error.message);
  }
});

// Agendar consulta
router.post('/agendar', async (req, res) => {
  try {
      const { usuarioId, psicologoId, dataHora } = req.body;

      const paciente = await findPacienteByUsuarioId(usuarioId);
      if (!paciente) {
          return res.status(400).json({ error: 'Paciente não encontrado' });
      }
      const novaConsulta = {
          pacienteId: paciente.id,
          psicologoId,
          dataHora: new Date(dataHora)
      };

      const id = await agendarConsulta(novaConsulta);
      console.log("✅ Consulta agendada com ID:", id);
      res.status(201).json({
          id,
          message: 'Consulta agendada com sucesso! Aguarde a confirmação do psicólogo.'
      });
  } catch (error) {
      console.error("Erro ao agendar:", error);
      res.status(500).json({ error: error.message });
  }
});

// Buscar consultas do paciente
router.get('/paciente/:usuarioId', async (req, res) => {
    try {
        const { usuarioId } = req.params;

        const paciente = await findPacienteByUsuarioId(usuarioId);
        if (!paciente) {
            return res.status(404).json({ error: 'Paciente não encontrado' });
        }

        const consultas = await getConsultasByPaciente(paciente.id);
        res.json(consultas);
    } catch (error) {
        console.error("Erro ao buscar consultas:", error);
        res.status(500).json({ error: error.message });
    }
});

// Buscar solicitações do psicólogo
router.get('/psicologo/:usuarioId/solicitacoes', async (req, res) => {
    try {
        const { usuarioId } = req.params;

        const psicologo = await findPsicologoByUsuarioId(usuarioId);
        if (!psicologo) {
            return res.status(404).json({ error: 'Psicólogo não encontrado' });
        }

        const solicitacoes = await getSolicitacoesByPsicologo(psicologo.id);
        res.json(solicitacoes);
    } catch (error) {
        console.error("Erro ao buscar solicitações:", error);
        res.status(500).json({ error: error.message });
    }
});

// Confirmar consulta (psicólogo envia link)
router.put('/confirmar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { linkAtendimento } = req.body;

        if (!linkAtendimento) {
            return res.status(400).json({ error: 'Link de atendimento é obrigatório' });
        }

        const sucesso = await confirmarConsulta(id, linkAtendimento);

        if (sucesso) {
            res.json({ message: 'Consulta confirmada com sucesso!' });
        } else {
            res.status(404).json({ error: 'Consulta não encontrada' });
        }
    } catch (error) {
        console.error("Erro ao confirmar consulta:", error);
        res.status(500).json({ error: error.message });
    }
});

// Cancelar consulta
router.put('/cancelar/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const sucesso = await cancelarConsulta(id);

        if (sucesso) {
            res.json({ message: 'Consulta cancelada com sucesso!' });
        } else {
            res.status(404).json({ error: 'Consulta não encontrada' });
        }
    } catch (error) {
        console.error("Erro ao cancelar consulta:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;