import mysql from 'mysql2/promise'
import 'dotenv/config';

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection()
    .then(connection => {
        console.log('✅ Conectado ao banco:', process.env.MYSQL_DB);
        connection.release();
    })
    .catch(err => {
        console.error('❌ Erro ao conectar no banco:', err.message);
    });

console.log('Pool de conexões MySQL criado com sucesso!');

export { pool }