import { api } from "./config";

export async function loginUsuario(email, senha) {
    console.log("Logando...");
    try {
        const resposta = await api
            .post('/usuarios/login', {
                email: email,
                senha: senha
            });
        console.log("✅ Login bem-sucedido!. Tipo de usuário: ", resposta.data.tipo);

        return resposta.data;
    }
    catch (error) {
        console.error("Erro no login: ", error.response?.data || error.message);
        throw error;
    }
}