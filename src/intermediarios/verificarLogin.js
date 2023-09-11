const jwt = require('jsonwebtoken');
const { senhaToken } = require('../../dadosSensiveis');
const { encontrarUsuarioPorId } = require('../repositorios/usuarios');

const verificarLogin = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ mensagem: 'Usuário não autorizado' });
    const token = authorization.split(' ')[1];

    try {
        const verificacaoToken = jwt.verify(token, senhaToken);
        const usuarioEncontrado = await encontrarUsuarioPorId(verificacaoToken.id);
        if (usuarioEncontrado.rowCount < 1) return res.status(401).json({ mensagem: 'Usuário não autorizado.' });

        req.usuario = usuarioEncontrado.rows[0];
        next();
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = verificarLogin;