const {
  obterTransacoes,
  obterTransacao,
  encontrarCategoria,
  atualizarTransacaoUsuario,
  inserirTransacao,
  excluirTransacaoUsuario,
  somarEntradas,
  somarSaidas
} = require('../repositorios/transacoes');

const listarTransacoes = async (req, res) => {
  try {
    const usuarioID = req.usuario.id;
    const transacoesUsuario = await obterTransacoes(usuarioID);

    if (transacoesUsuario.rowCount > 0) {
      return res.status(200).json(transacoesUsuario.rows);
    } else {
      return res.status(200).json([]);
    }
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};



const detalharTransacao = async (req, res) => {
  try {
    const usuarioID = req.usuario.id;
    const transacaoID = req.params.id;
    const transacaoUsuario = await obterTransacao(usuarioID, transacaoID);

    if (transacaoUsuario.rowCount === 1) {
      return res.status(200).json(transacaoUsuario.rows[0]);
    } else {
      return res.status(404).json({ mensagem: 'Transação não encontrada.' });
    }
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

const cadastrarTransacao = async (req, res) => {
  try {
    const usuarioID = req.usuario.id;
    const { tipo, descricao, valor, data, categoria_id } = req.body;

    if (!tipo || !descricao || !valor || !data || !categoria_id) {
      return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' });
    }

    const categoriaEncontrada = await encontrarCategoria(categoria_id);

    if (categoriaEncontrada.rowCount === 0) {
      return res.status(404).json({ mensagem: 'Categoria não encontrada.' });
    }
    if (tipo !== 'entrada' && tipo !== 'saida') {
      return res.status(400).json({ mensagem: 'O tipo deve ser "entrada" ou "saida".' });
    }

    const transacaoInserida = await inserirTransacao(tipo, descricao, valor, data, categoria_id, usuarioID);

    return res.status(201).json(transacaoInserida.rows[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};


const atualizarTransacao = async (req, res) => {
  try {
    const usuarioID = req.usuario.id;
    const transacaoID = req.params.id;
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
      return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' });
    }

    const categoriaEncontrada = await encontrarCategoria(categoria_id);

    if (categoriaEncontrada.rowCount === 0) {
      return res.status(404).json({ mensagem: 'Categoria não encontrada.' });
    }

    if (tipo !== 'entrada' && tipo !== 'saida') {
      return res.status(400).json({ mensagem: `O tipo deve ser "entrada" ou "saida".` });
    }

    const transacaoUsuario = await obterTransacao(usuarioID, transacaoID);
    if (transacaoUsuario.rowCount === 0) {
      return res.status(404).json({ mensagem: 'Transação não encontrada ou não pertence ao usuário logado.' });
    }

    await atualizarTransacaoUsuario(descricao, valor, data, categoria_id, tipo, transacaoID);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

const excluirTransacao = async (req, res) => {
  try {
    const usuarioID = req.usuario.id;
    const transacaoID = req.params.id;

    const transacaoUsuario = await obterTransacao(usuarioID, transacaoID);
    if (transacaoUsuario.rowCount === 0) {
      return res.status(404).json({ mensagem: 'Transação não encontrada ou não pertence ao usuário logado.' });
    }

    await excluirTransacaoUsuario(transacaoID);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

const obterExtrato = async (req, res) => {
  try {
    const usuarioID = req.usuario.id;

    const entradas = await somarEntradas(usuarioID);
    const somaEntradas = entradas.rows[0].soma_entradas || 0;

    const saidas = await somarSaidas(usuarioID);
    const somaSaidas = saidas.rows[0].soma_saidas || 0;

    return res.status(200).json({ entrada: somaEntradas, saida: somaSaidas });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

module.exports = {
  listarTransacoes,
  detalharTransacao,
  cadastrarTransacao,
  atualizarTransacao,
  excluirTransacao,
  obterExtrato
};