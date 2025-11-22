import {pool} from "./connection.js";

export async function findUsuarioByEmail(email) {
    const [rows] = await pool.query(
        'SELECT * FROM usuarios WHERE email = ?', [email]
    );
    return rows[0];
}

export async function createUsuario(email, senha, tipo) {
    const [result] = await pool.query(
        'INSERT INTO usuarios (email, senha, tipo) VALUES (?, ?, ?)',
        [email, senha, tipo]
    );
    return result.insertId;
}