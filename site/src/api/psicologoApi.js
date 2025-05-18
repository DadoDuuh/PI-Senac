import { api } from './config.js'

export async function loginPsicologo(email, senha) {
    const resposta = await api.post('/psicologos/login', {
        email: email,
        senha: senha
    });

    return resposta.data;
}

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


export async function psicologosDisponiveis() {
    const resposta = await api.get('/psicologos/disponiveis');

    return resposta.data;
}
