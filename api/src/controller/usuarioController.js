import { Router } from 'express';
import { findUsuarioByEmail, createUsuario } from '../repository/usuarioRepository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', async (req, res) => {
  try {
      const { email, senha } = req.body;
      const usuario = await findUsuarioByEmail(email);

      if (!usuario) {
          return res.status(404).send('Usuário não encontrado');
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
          return res.status(401).send('Senha inválida');
      }

      const token = jwt.sign(
          { id: usuario.id, tipo: 'usuario' },
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
    const { nome, email, senha, cpf, telefone } = req.body;

    const usuarioExistente = await findUsuarioByEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    const cpfLimpo = cpf.replace(/[.\-]/g, '');
    const userId = await createUsuario(
      nome, email, hashedPassword, cpfLimpo, telefone);
    
    const token = jwt.sign(
      { id: userId, tipo: 'usuario' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;