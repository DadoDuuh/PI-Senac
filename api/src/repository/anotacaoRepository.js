import { pool } from './connection.js';

export async function buscarAnotacoes(descricao) {
    const [rows] = await pool.query('SELECT id, descricao FROM anotacoes WHERE paciente_id = ? AND consulta_id = ? AND psicologo_id = ?', 
        [descricao.idPaciente, descricao.idConsulta, descricao.idPsicologo]);
    return rows;
}

export async function inserirAnotacao({ pacienteId, psicologoId, consultaId, descricao }) {
    const [result] = await pool.query(
        `INSERT INTO anotacoes (paciente_id, psicologo_id, consulta_id, descricao)
         VALUES (?, ?, ?, ?)`,
        [pacienteId, psicologoId, consultaId, descricao]
    );

    return result.insertId;    
}

export async function alterarAnotacao(descricao) {
 const [result] = await pool.query(
        'UPDATE anotacoes SET descricao = ? WHERE id = ?',
        [descricao.descricao, descricao.idAnotacao]
    );
    return result.affectedRows > 0;
}

 

