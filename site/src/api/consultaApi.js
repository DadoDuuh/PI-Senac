import { api } from "./config";

export async function listarConsultas() {
    const resposta = await api.get('/consultas/listar');

    return resposta.data;
}

export async function agendarConsulta(consulta) {
    const resposta = await api.post('/consultas/agendar', {
        pacienteId: consulta.pacienteId,
        psicologId: consulta.psicologId,
        dataHora: consulta.dataHora,
    });

    return resposta.data;
}