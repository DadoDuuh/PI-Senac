import { pool } from './connection.js';

export async function listarConsultas() {
    const [rows] = await pool.query('SELECT * FROM agendamentos');
    return rows;
}

export async function agendarConsulta(consulta) {
    const [result] = await pool.query(
        'INSERT INTO agendamentos (paciente_id, psicologo_id, data_hora) VALUES (?, ?, ?)',
        [consulta.pacienteId, consulta.psicologoId, consulta.dataHora]
    );
    return result.insertId;
}

export async function getConsultasByPaciente(pacienteId) {
    const [rows] = await pool.query(`
        SELECT
            a.*,
            p.nome as psicologo_nome,
            p.especialidade,
            p.crp
        FROM agendamentos a
        JOIN psicologos p ON a.psicologo_id = p.id
        WHERE a.paciente_id = ?
        ORDER BY a.data_hora DESC
    `, [pacienteId]);
    return rows;
}

export async function getConsultasByPsicologo(psicologoId) {
    const [rows] = await pool.query(`
        SELECT
            a.*,
            p.nome as paciente_nome,
            p.cpf
        FROM agendamentos a
        JOIN pacientes p ON a.paciente_id = p.id
        WHERE a.psicologo_id = ?
        ORDER BY a.data_hora DESC
    `, [psicologoId]);
    return rows;
}

export async function getSolicitacoesByPsicologo(psicologoId) {
    const [rows] = await pool.query(`
        SELECT 
            a.*,
            pac.nome as paciente_nome,
            pac.telefone
        FROM agendamentos a
        JOIN pacientes pac ON a.paciente_id = pac.id
        WHERE a.psicologo_id = ? AND a.status = 'pendente'
        ORDER BY a.data_hora ASC
    `, [psicologoId]);
    return rows;
}

export async function confirmarConsulta(agendamentoId, linkAtendimento) {
    const [result] = await pool.query(
        'UPDATE agendamentos SET status = ?, link_atendimento = ? WHERE id = ?',
        ['confirmado', linkAtendimento, agendamentoId]
    );
    return result.affectedRows > 0;
}

export async function cancelarConsulta(agendamentoId) {
    const [result] = await pool.query(
        'UPDATE agendamentos SET status = ? WHERE id = ?',
        ['cancelado', agendamentoId]
    );
    return result.affectedRows > 0;
}