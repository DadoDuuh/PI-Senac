const express = require('express');
import { buscarPsicologoPorEmail, inserirPsicologo } from '../repository/psicologoRepository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
      const { email, senha } = req.body;
      const psicologo = await buscarPsicologoPorEmail(email);

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

export default router;