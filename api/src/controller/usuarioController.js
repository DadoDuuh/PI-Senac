import { Router } from 'express';
import { findUsuarioByEmail } from "../repository/usuarioRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
            { id: usuario.id, tipo: usuario.tipo },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        console.log("Login bem-sucedido! Tipo:", usuario.tipo);

        res.status(200).json({
            token,
            tipo: usuario.tipo,
            usuarioId: usuario.id
        });
    } catch (error) {
        console.error('Erro no login: ', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;