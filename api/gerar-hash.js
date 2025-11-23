import bcrypt from 'bcrypt';

async function gerarHash() {
    const senha = 'senha123';
    const hash = await bcrypt.hash(senha, 10);

    console.log('=====================================');
    console.log('HASH GERADO COM SUCESSO!');
    console.log('=====================================');
    console.log('Senha original:', senha);
    console.log('Hash gerado:', hash);
    console.log('=====================================');
    console.log('\nCopie este valor para usar no SQL:');
    console.log(`'${hash}'`);
    console.log('=====================================');

    // Testa se o hash funciona
    const valido = await bcrypt.compare(senha, hash);
    console.log('\nTeste de validação:', valido ? '✅ PASSOU' : '❌ FALHOU');
}

gerarHash();