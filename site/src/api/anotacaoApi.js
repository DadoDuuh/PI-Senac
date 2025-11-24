import { api } from "./config";

export async function buscarAnotacoes(pacienteId, consultaId, psicologoId) {
    const resposta = await api.get(`/anotacoes/buscar/${pacienteId}/${consultaId}/${psicologoId}`);
    return resposta.data[0];
}

export async function inserirAnotacao(descricao) {
    const resposta = await api.post('/anotacoes/inserir', {
        pacienteId: descricao.pacienteId,
        psicologoId: descricao.psicologoId,
        consultaId: descricao.consultaId,
        descricao: descricao.descricao
    });
    return resposta.data;
}

export async function alterarAnotacao(descricao, idAnotacao) {
    const resposta = await api.put('/anotacoes/alterar', {
        idAnotacao: idAnotacao,
        descricao: descricao,
    });
    return resposta.data;
}