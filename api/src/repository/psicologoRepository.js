import { pool } from './connection.js';

export async function createPsicologo(usuarioId, nome, crp, especialidade) {
    const [result] = await pool.query(
        'INSERT INTO psicologos (usuario_id, nome, crp, especialidade) VALUES (?, ?, ?, ?)',
        [usuarioId, nome, crp, especialidade]
    );
    console.log("psicologoId criado:", result.insertId);
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
        'SELECT * FROM psicologos WHERE id = ?', [id]
    );
    return rows[0]; 
}

export async function findPsicologoByUsuarioId(usuarioId) {
    const [rows] = await pool.query(
        'SELECT * FROM psicologos WHERE usuario_id = ?', [usuarioId]
    );
    return rows[0];
}

//EXEMPLO:>>>>>
//
// pegar id do psicologo
// export async function idPsicologoDenuncia(denuncia) {
//     const comando = `select id_psicologo
//                         from tb_psicologo
//                     where nm_psicologo = ? and ds_email = ?`

//     const [resposta] = await con.query(comando, [denuncia.nomePsicologo.trim(), denuncia.emailPsicologo.trim()]);
//     return resposta[0];
// }
