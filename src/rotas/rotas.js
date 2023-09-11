const express = require('express');
const verificarLogin = require('../intermediarios/verificarLogin');
const { cadastrarTransacao, atualizarTransacao, excluirTransacao, obterExtrato, listarTransacoes, detalharTransacao } = require('../controladores/transacoes');
const { cadastrarUsuario, logarUsuario, detalharUsuario, atualizarUsuario } = require('../controladores/usuarios');
const { listarCategorias } = require('../controladores/categorias');

const rotas = express();

rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login', logarUsuario);

rotas.use(verificarLogin);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', atualizarUsuario);
rotas.get('/categoria', listarCategorias);
rotas.get('/transacao/extrato', obterExtrato);
rotas.get('/transacao', listarTransacoes);
rotas.get('/transacao/:id', detalharTransacao);
rotas.post('/transacao', cadastrarTransacao);
rotas.put('/transacao/:id', atualizarTransacao);
rotas.delete('/transacao/:id', excluirTransacao);


module.exports = rotas;