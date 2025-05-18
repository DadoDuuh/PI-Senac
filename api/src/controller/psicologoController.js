import { Router } from 'express';
import { findPsicologoByEmail, createPsicologo, getAvailablePsicologos } from '../repository/psicologoRepository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', async (req, res) => {
  try {
      const { email, senha } = req.body;
      const psicologo = await findPsicologoByEmail(email);

      if (!psicologo) {
          return res.status(404).send('Psicólogo não encontrado');
      }

      const senhaValida = await bcrypt.compare(senha, psicologo.senha);
      if (!senhaValida) {
          return res.status(401).send('Senha inválida');
      }

      const token = jwt.sign(
          { id: psicologo.id, tipo: 'psicologo' },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
      );

      res.status(200).json({ token });
  } catch (error) {
      res.status(500).send(error.message);
  }
});

router.post('/cadastro', async (req, res) => {
  try {
    const { nome, crp, email, senha, especialidade } = req.body;

    const psicologoExistente = await findPsicologoByEmail(email);
    if (psicologoExistente) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const novoPsicologo = {
      nome,
      crp,
      email,
      senha: hashedPassword,
      especialidade
    };

    const psicologoId = await createPsicologo(novoPsicologo);

    const token = jwt.sign(
      { id: psicologoId, tipo: 'psicologo' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).send(error.message);
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