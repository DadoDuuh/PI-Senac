import express from 'express';
import { buscarPorEmail, inserirUsuario } from '../repository/usuarioRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
      const { email, senha } = req.body;
      const usuario = await usuarioRepository.findUsuarioByEmail(email);

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
    const usuarioExistente = await usuarioRepository.findUsuarioByEmail(email);
    
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    const userId = await usuarioRepository.createUsuario(
      nome, email, hashedPassword, cpf, telefone);
    
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