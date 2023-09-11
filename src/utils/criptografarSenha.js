const bcrypt = require('bcrypt');

const criptograrSenha = async (senha) => {
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    return senhaCriptografada;
};

module.exports = criptograrSenha;