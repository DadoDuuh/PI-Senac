import { pool } from './connection.js';

export async function findUsuarioByEmail() {
    const [rows] = await pool.query(
        'SELECT * FROM tb_usuario WHERE ds_email = ?',
        [email]
    );
    return rows[0];
}

export async function createUsuario(usuario) {
    const [result] = await pool.query(
        'INSERT INTO usuarios (nome, email, senha, cpf, telefone) VALUES (?, ?, ?, ?, ?)',
        [usuario.nome, usuario.email, usuario.senha, usuario.cpf, usuario.telefone]
    );
    return result.insertId;
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