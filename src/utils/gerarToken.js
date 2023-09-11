const jwt = require('jsonwebtoken');

const gerarToken = (usuarioEncontrado, senhaToken) => {
    const token = jwt.sign({ id: usuarioEncontrado.id }, senhaToken, { expiresIn: '8h' });
    return token;
};

module.exports = gerarToken;