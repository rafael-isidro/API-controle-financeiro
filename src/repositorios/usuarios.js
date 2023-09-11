const pool = require('../config/conexao');

const encontrarEmailUsuario = (email) => {
    const queryEncontrarEmailUsuario = {
        text: `
            SELECT 
                *
            FROM 
                usuarios
            WHERE
                email = $1
        `,
        values: [email]
    };
    const usuarioEncontrado = pool.query(queryEncontrarEmailUsuario);

    return usuarioEncontrado;
};
const cadastrarUsuarioBD = (usuario) => {
    const { nome, email, senhaCriptografada } = usuario;

    const queryCadastrarUsuarioBD = {
        text: `
                INSERT INTO 
                    usuarios (nome, email, senha)
                VALUES
                    ($1, $2, $3)
                RETURNING *
        `,
        values: [nome, email, senhaCriptografada]
    };
    const usuarioCadastrado = pool.query(queryCadastrarUsuarioBD);

    return usuarioCadastrado;
};

const encontrarUsuarioPorId = (idUsuario) => {
    const queryEncontrarUsuarioPorId = {
        text: `
            SELECT
                *
            FROM
                usuarios
            WHERE
                id = $1
        `,
        values: [idUsuario]
    };
    const usuarioEncontrado = pool.query(queryEncontrarUsuarioPorId);

    return usuarioEncontrado;
};

const atualizarUsuarioBD = (usuario) => {
    const { nome, email, senhaCriptografada, id } = usuario;

    const queryAtualizarUsuarioBD = {
        text: `
                UPDATE 
                    usuarios
                SET
                    nome = $1, email = $2, senha = $3
                WHERE
                    id = $4
        `,
        values: [nome, email, senhaCriptografada, id]
    };
    const usuarioAtualizado = pool.query(queryAtualizarUsuarioBD);

    return usuarioAtualizado;
};

module.exports = {
    encontrarEmailUsuario,
    cadastrarUsuarioBD,
    encontrarUsuarioPorId,
    atualizarUsuarioBD
};