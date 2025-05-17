import { con } from './connection.js';


export async function loginRepository() {
    const comando = ``

    const [resposta] = await con.query(comando);
    
    return resposta[0];
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