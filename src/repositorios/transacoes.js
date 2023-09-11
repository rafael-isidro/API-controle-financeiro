const pool = require('../config/conexao');

const obterTransacoes = (usuarioID) => {
    const queryObterTransacoes = {
        text: 'SELECT * FROM transacoes WHERE usuario_id = $1',
        values: [usuarioID],
    };

    const resultado = pool.query(queryObterTransacoes);
    return resultado;
};

const obterTransacao = (usuarioID, transacaoID) => {
    const queryObterTransacao = {
        text: 'SELECT * FROM transacoes WHERE id = $1 and usuario_id = $2',
        values: [transacaoID, usuarioID],
    };

    const resultado = pool.query(queryObterTransacao);
    return resultado;
};

const encontrarCategoria = (categoria_id) => {
    const queryCategoria = {
        text: 'select * from categorias where id = $1',
        values: [categoria_id],
    };

    const categoriaResult = pool.query(queryCategoria);
    return categoriaResult;
};

const inserirTransacao = (tipo, descricao, valor, data, categoria_id, usuarioID) => {
    const queryInserirTransacao = {
        text: `
          insert into transacoes (tipo, descricao, valor, data, categoria_id, usuario_id) 
          values ($1, $2, $3, $4, $5, $6) returning *
          `,
        values: [tipo, descricao, valor, data, categoria_id, usuarioID],
    };

    const result = pool.query(queryInserirTransacao);
    return result;
};

const atualizarTransacaoUsuario = (descricao, valor, data, categoria_id, tipo, transacaoID) => {
    const queryAtualizarTransacao = {
        text: 'update transacoes set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 where id = $6',
        values: [descricao, valor, data, categoria_id, tipo, transacaoID],
    };

    const result = pool.query(queryAtualizarTransacao);
    return result;
};

const excluirTransacaoUsuario = (transacaoID) => {
    const queryExcluirTransacao = {
        text: 'delete from transacoes where id = $1',
        values: [transacaoID],
    };

    const result = pool.query(queryExcluirTransacao);
    return result;
};

const somarEntradas = (usuarioID) => {
    const somaEntradasQuery = {
        text: 'select sum(valor) as soma_entradas from transacoes where usuario_id = $1 and tipo = $2',
        values: [usuarioID, 'entrada'],
    };

    const somaEntradasResult = pool.query(somaEntradasQuery);
    return somaEntradasResult;
};

const somarSaidas = (usuarioID) => {
    const somaSaidasQuery = {
        text: 'select sum(valor) as soma_saidas from transacoes where usuario_id = $1 and tipo = $2',
        values: [usuarioID, 'saida'],
    };

    const somaSaidasResult = pool.query(somaSaidasQuery);
    return somaSaidasResult;
};
module.exports = {
    obterTransacoes,
    obterTransacao,
    encontrarCategoria,
    inserirTransacao,
    atualizarTransacaoUsuario,
    excluirTransacaoUsuario,
    somarEntradas,
    somarSaidas
};