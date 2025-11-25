import { api } from './config.js'

export async function cadastroPaciente(nome, cpf, email, senha, telefone) {
    console.log("FRONTEND: Entrou no cadastroPaciente");
    console.log("Enviando para:", api.defaults.baseURL + '/pacientes/cadastro');
    console.log("Dados:", {nome, email, cpf, telefone});

    try {
        const resposta = await api
            .post('/pacientes/cadastro', {
                nome: nome,
                email: email,
                senha: senha,
                cpf: cpf,
                telefone: telefone
            });
        console.log("✅ RESPOSTA DO BACKEND:", resposta.data);
        return resposta.data;
    } catch (error) {
        console.error("ERRO NA REQUISIÇÃO:", error.response?.data || error.message);
        throw error;
    }
}

export async function buscarPerfilPaciente(usuarioId) {
    console.log("🔍 Buscando perfil do paciente:", usuarioId);
    const resposta = await api.get(`/pacientes/perfil/${usuarioId}`);
    return resposta.data;
}

export async function buscarPacientePorId(pacienteId) {
    const resposta = await api.get(`/pacientes/${pacienteId}`);
    return resposta.data;
}