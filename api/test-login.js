import { pool } from './src/repository/connection.js';

async function testarLogin() {
    try {
        console.log("1. Testando conexão...");
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', ['ronaldo@test.com']);
        console.log("2. Resultado:", rows);
        console.log("3. Primeiro registro:", rows[0]);
    } catch (error) {
        console.error("❌ ERRO:", error);
    } finally {
        process.exit();
    }
}

testarLogin();