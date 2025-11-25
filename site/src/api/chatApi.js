import { api } from "./config";

export async function buscarMensagens(state) {
    const resposta = await api.get(`/chat/buscar/mensagens/${state.paciente_id}/${state.psicologo_id}/${state.id}`);
    return resposta.data;
}

export async function enviarMensagem(mensagem) {
    const resposta = await api.post(`/chat/enviar`, {
        sender: mensagem.sender,
        chat_id: mensagem.chat_id,
        mensagem: mensagem.mensagem
    });
    return resposta.data;
}

export async function criarChat(state) {
    const resposta = await api.post(`/chat/criar`, {
        paciente_id: state.paciente_id,
        psicologo_id: state.psicologo_id
    });
    return resposta.data;
}

export async function buscarChat(state) {
    const resposta = await api.get(`/chat/buscar/chat/${state.consulta.paciente_id}/${state.consulta.psicologo_id}`);
    return resposta.data;
}

export async function buscarConversas(pacienteId, psicologoId) {
    const resposta = await api.get(`/chat/buscar/conversas/${pacienteId}/${psicologoId}`);
    return resposta.data;
}