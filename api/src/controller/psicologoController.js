import { Router } from 'express';
import { createPsicologo, findPsicologoByUsuarioId, getAvailablePsicologos } from '../repository/psicologoRepository.js';
import { findUsuarioByEmail, createUsuario } from '../repository/usuarioRepository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/cadastro', async (req, res) => {
  try {
    const { nome, email, senha, crp, especialidade } = req.body;

    const usuarioExistente = await findUsuarioByEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const usuarioId = await createUsuario(email, hashedPassword, 'psicologo');
    console.log("usuarioId psicólogo(a) criado: " + usuarioId);

    const psicologoId = await createPsicologo(usuarioId, nome, crp, especialidade);
    console.log("usuarioId psicólogo(a) criado: " + usuarioId);

    const token = jwt.sign(
      { id: usuarioId, tipo: 'psicologo' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(201).json({ token, usuarioId, psicologoId });
  } catch (error) {
    console.error("Erro no cadastro: ", error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/perfil/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const psicologo = await findPsicologoByUsuarioId(id);
        if (!psicologo) {
            return res.status(404).json({ error: 'Psicólogo(a) não encontrado(a).' });
        }
        res.status(200).json(psicologo);
    } catch (error) {
        console.error("Erro ao buscar perfil:", error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/disponiveis', async (req, resp) => {
    try {
        const psicologos = await getAvailablePsicologos();
        resp.status(200).json(psicologos);
    }
    catch (error) {
        resp.status(500).send(error.message);
    }
})

export default router;