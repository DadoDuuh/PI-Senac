import { api } from "./config";

export async function listarConsultas() {
    const resposta = await api.get('/consultas/listar');
    return resposta.data;
}

export async function agendarConsulta(usuarioId, psicologoId, dataHora) {
    const resposta = await api.post('/consultas/agendar', {
        usuarioId,
        psicologoId,
        dataHora,
    });
    return resposta.data;
}

// Buscar consultas do paciente
export async function buscarConsultasPaciente(usuarioId) {
    const resposta = await api.get(`/consultas/paciente/${usuarioId}`);
    return resposta.data;
}

// Buscar consultas do psicólogo
export async function buscarConsultasPsicologo(usuarioId) {
    const resposta = await api.get(`/consultas/psicologo/${usuarioId}`);
    return resposta.data;
}

// Buscar solicitações pendentes
export async function buscarSolicitacoesPsicologo(usuarioId) {
    const resposta = await api.get(`/consultas/psicologo/${usuarioId}/solicitacoes`);
    return resposta.data;
}

// Confirmar consulta com link
export async function confirmarConsulta(agendamentoId, linkAtendimento) {
    const resposta = await api.put(`/consultas/confirmar/${agendamentoId}`, {
        linkAtendimento
    });
    return resposta.data;
}

// Cancelar consulta
export async function cancelarConsulta(agendamentoId) {
    const resposta = await api.put(`/consultas/cancelar/${agendamentoId}`);
    return resposta.data;
}