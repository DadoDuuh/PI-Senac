import {api} from './config.js'

// export async function loginPaciente(email, senha) {
//     console.log("Entrou no loginPaciente")
//     const resposta = await api.post('/pacientes/login', {
//         email: email,
//         senha: senha
//     });
//     console.log("email loginPaciente: " + email);
//     console.log("senha loginPaciente: " + senha);
//     console.log("resposta loginPaciente: " + resposta);
//     console.log("resposta.data: " + resposta.data);
//     return resposta.data;
// }

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
        console.error("❌ ERRO NA REQUISIÇÃO:", error.response?.data || error.message);
        throw error;
    }
}