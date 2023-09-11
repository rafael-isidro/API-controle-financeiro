const bcrypt = require('bcrypt');

const compararSenhas = async (senha, senhaCriptografada) => {
    return bcrypt.compare(senha, senhaCriptografada);
};

module.exports = compararSenhas;