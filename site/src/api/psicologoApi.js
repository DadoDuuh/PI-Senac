import { api } from './config.js'

export async function cadastroPsicologo(nome, crp, email, senha, especialidade) {
    const resposta = await api.post('/psicologos/cadastro', {
        nome: nome,
        crp: crp,
        email: email,
        senha: senha,
        especialidade: especialidade
    });

    return resposta.data;
}

export async function buscarPerfilPsicologo(usuarioId) {
    console.log("🔍 Buscando perfil do psicólogo:", usuarioId);
    const resposta = await api.get(`/psicologos/perfil/${usuarioId}`);
    return resposta.data;
}

export async function psicologosDisponiveis() {
    const resposta = await api.get('/psicologos/disponiveis');

    return resposta.data;
}
