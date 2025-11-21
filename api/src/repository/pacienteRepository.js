import { pool } from './connection.js';

export async function createPaciente(usuarioId, nome, cpf, telefone) {
  const [result] = await pool.query(
    'INSERT INTO pacientes (usuario_id, nome, cpf, telefone) VALUES (?, ?, ?, ?)',
    [usuarioId, nome, cpf, telefone]
  );
    console.log("nome createPaciente:" + nome);
    console.log("cpf createPaciente:" + cpf);
    console.log("telefone createPaciente:" + telefone);
  return result.insertId;
}

export async function findPacienteById(id) {
    const [rows] = await pool.query(
        'SELECT * FROM pacientes WHERE id = ?',
        [id]
    );
    console.log("pool findPacienteById:" + pool);
    console.log("id findPacienteById:" + id);
    console.log("rows[0] findPacienteById:" + rows[0]);
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