import { Router } from 'express';
import { createPaciente, findPacienteByUsuarioId, findPacienteById } from '../repository/pacienteRepository.js';
import { findUsuarioByEmail, createUsuario } from '../repository/usuarioRepository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/cadastro', async (req, res) => {
    try {
        const {nome, email, senha, cpf, telefone} = req.body;
        console.log("pacienteController /cadastro -> nome: " + nome + ", email: " + email + ", senha: " + senha, "cpf: " + cpf, "telefone: " + telefone);
        const usuarioExistente = await findUsuarioByEmail(email);
        if (usuarioExistente) {
            return res.status(400).json({error: 'Email já cadastrado'});
        }
        const hashedPassword = await bcrypt.hash(senha, 10);
        const cpfLimpo = cpf.replace(/[.\-]/g, '');

        // Cria o usuário para login:
        const usuarioId = await createUsuario(email, hashedPassword, 'paciente');
        console.log("usuarioId criado: " + usuarioId);

        // Cria o paciente vinculado ao usuário:
        const pacienteId = await createPaciente(usuarioId, nome, cpfLimpo, telefone);
        console.log("pacienteId criado: " + pacienteId);

        // Gera o token com o usuarioId:
        const token = jwt.sign(
            {id: usuarioId, tipo: 'paciente'},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );
        res.status(201).json({token, usuarioId, pacienteId});
    } catch (error) {
        console.error("Erro no cadastro: ", error);
        res.status(500).json({error: error.message});
    }
});

router.get('/perfil/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const paciente = await findPacienteByUsuarioId(id);
        if (!paciente) {
            return res.status(404).json({ error: 'Paciente não encontrado' });
        }
        res.status(200).json(paciente);
    } catch (error) {
        console.error("Erro ao buscar perfil:", error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, resp) => {
    try {
        const paciente = await findPacienteById(req.params.id);
        resp.status(200).json(paciente);
    }
    catch (error) {
        resp.status(500).send(error.message);
    }
})

export default router;