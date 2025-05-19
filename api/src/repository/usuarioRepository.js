import { pool } from './connection.js';

export async function findUsuarioByEmail(email) {
    const [rows] = await pool.query(
        'SELECT * FROM usuarios WHERE email = ?',
        [email]
    );
    return rows[0];
}

export async function createUsuario(nome, email, senha, cpf, telefone) {
  const [result] = await pool.query(
    'INSERT INTO usuarios (nome, email, senha, cpf, telefone) VALUES (?, ?, ?, ?, ?)',
    [nome, email, senha, cpf, telefone]
  );
  return result.insertId;
}

export async function findUsuarioById(id) {
    const [rows] = await pool.query(
        'SELECT * FROM usuarios WHERE id = ?',
        [id]
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