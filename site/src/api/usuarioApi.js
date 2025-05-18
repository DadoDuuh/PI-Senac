import { api } from './config.js'

export async function loginUsuario(email, senha) {
    const resposta = await api.post('/usuarios/login', {
        email: email,
        senha: senha
    });

    return resposta.data;
}

export async function cadastroUsuario(nome, email, senha, cpf, telefone) {
    const resposta = await api.post('/usuarios/cadastro', {
        nome: nome,
        email: email,
        senha: senha,
        cpf: cpf,
        telefone: telefone
    });

    return resposta.data;
}