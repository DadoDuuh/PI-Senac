import { pool } from "./connection.js";

export async function buscarMensagens(chat) {
    const [rows] = await pool.query(
        `SELECT *
         FROM mensagem
         INNER JOIN chat on chat.id = mensagem.chat_id
         WHERE (chat.paciente_id = ? AND chat.psicologo_id = ? AND chat.id = ?)
         ORDER BY mensagem.id ASC`,
        [chat.pacienteId, chat.psicologoId, chat.chatId]
    );
    return rows;
}

export async function buscarChat(chat) {
    const [rows] = await pool.query(
        `SELECT *
         FROM chat
         WHERE (paciente_id = ? AND psicologo_id = ?)`,
        [chat.pacienteId, chat.psicologoId]
    );
    return rows[0];
}

export async function InserirMensagem(chat) {
    const [rows] = await pool.query(
        `INSERT INTO
         mensagem
          (sender, chat_id, mensagem)
         VALUES (?, ?, ?)`,
        [chat.sender, chat.chat_id, chat.mensagem]
    );
    return rows;
}

export async function criarChat(chat) {
    const [rows] = await pool.query(
        `INSERT INTO
         chat
          (paciente_id, psicologo_id)
         VALUES (?, ?)`,
        [chat.paciente_id, chat.psicologo_id]
    );
    return rows.insertId;
} 

export async function buscarCoversas(chat) {
    const [rows] = await pool.query(
        `SELECT *
         FROM chat
         WHERE paciente_id = ? OR psicologo_id = ?`,
        [chat.pacienteId, chat.psicologoId]
    );
    return rows;
}