const express = require('express');
const verificarLogin = require('../intermediarios/verificarLogin');
const { cadastrarTransacao, atualizarTransacao, excluirTransacao, obterExtrato, listarTransacoes, detalharTransacao } = require('../controladores/transacoes');
const { cadastrarUsuario, logarUsuario, detalharUsuario, atualizarUsuario } = require('../controladores/usuarios');
const { listarCategorias } = require('../controladores/categorias');
const { schemaUsuarios, schemaUsuariosLogin } = require('../validacoes/schemaUsuarios');
const { schemaTransacoes } = require('../validacoes/schemaTransacoes');
const validarCorpoRequisicao = require('../intermediarios/validarCorpoRequisicao');
const rotas = express();

rotas.post('/usuario', validarCorpoRequisicao(schemaUsuarios), cadastrarUsuario);
rotas.post('/login', validarCorpoRequisicao(schemaUsuariosLogin), logarUsuario);

rotas.use(verificarLogin);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', validarCorpoRequisicao(schemaUsuarios), atualizarUsuario);
rotas.get('/categoria', listarCategorias);
rotas.get('/transacao/extrato', obterExtrato);
rotas.get('/transacao', listarTransacoes);
rotas.get('/transacao/:id', detalharTransacao);
rotas.post('/transacao', validarCorpoRequisicao(schemaTransacoes), cadastrarTransacao);
rotas.put('/transacao/:id', validarCorpoRequisicao(schemaTransacoes), atualizarTransacao);
rotas.delete('/transacao/:id', excluirTransacao);


module.exports = rotas;