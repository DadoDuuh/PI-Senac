import { pool } from './connection.js';

export async function findPsicologoByEmail(email) {
    const [rows] = await pool.query(
        'SELECT * FROM psicologos WHERE email = ?',
        [email]
    );
    return rows[0];
}

export async function createPsicologo(psicologo) {
    const [result] = await pool.query(
        'INSERT INTO psicologos (nome, crp, email, senha, especialidade) VALUES (?, ?, ?, ?, ?)',
        [psicologo.nome, psicologo.crp, psicologo.email, psicologo.senha, psicologo.especialidade]
    );
    return result.insertId;
}

export async function getAvailablePsicologos() {
    const [rows] = await pool.query(
        'SELECT * FROM psicologos WHERE disponivel = TRUE'
    );
    return rows;
}

export async function findPsicologoById(id) {
    const [rows] = await pool.query(
        'SELECT * FROM psicologos WHERE id = ?',
        [id]
    );
    return rows[0]; 
}

