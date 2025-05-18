import { pool } from './connection.js';

export async function listarConsultas() {
    const [rows] = await pool.query('SELECT * FROM agendamentos');
    return rows;
}

export async function agendarConsulta(consulta) {
    const [result] = await pool.query(
        'INSERT INTO agendamentos (usuario_id, psicologo_id, data_hora) VALUES (?, ?, ?)',
        [consulta.pacienteId, consulta.psicologoId, consulta.dataHora]
    );
    return result.insertId;
}

export async function getConsultasByUser(userId, isPsicologo) {
    const query = isPsicologo
        ? 'SELECT * FROM agendamentos WHERE psicologo_id = ?'
        : 'SELECT * FROM agendamentos WHERE paciente_id = ?';
    const [rows] = await pool.query(query, [userId]);
    return rows;
}