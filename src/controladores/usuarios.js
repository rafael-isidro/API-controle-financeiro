const criptograrSenha = require('../utils/criptografarSenha');
const compararSenhas = require('../utils/compararSenhas');
const gerarToken = require('../utils/gerarToken');
const { encontrarEmailUsuario, cadastrarUsuarioBD, encontrarUsuarioPorId, atualizarUsuarioBD } = require('../repositorios/usuarios');
const { senhaToken } = require('../../dadosSensiveis');

const cadastrarUsuario = async (req, res) => {

    try {
        const { nome, email, senha } = req.body;
        const emailEncontrado = await encontrarEmailUsuario(email);
        if (emailEncontrado.rowCount > 0) return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' });

        const senhaCriptografada = await criptograrSenha(senha);
        const usuario = { nome, email, senhaCriptografada };

        const { rows: usuarioCadastrado } = await cadastrarUsuarioBD(usuario);
        delete usuarioCadastrado[0].senha;

        return res.status(201).json(usuarioCadastrado[0]);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const logarUsuario = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const { rows: usuariosEncontrados, rowCount } = await encontrarEmailUsuario(email);
        if (rowCount === 0) return res.status(404).json({ mensagem: 'Usuário e/ou senha inválido(s).' });
        const usuarioEncontrado = usuariosEncontrados[0];

        const senhaValida = await compararSenhas(senha, usuarioEncontrado.senha);
        if (!senhaValida) return res.status(401).json({ mensagem: 'Usuário e/ou senha inválido(s).' });

        const token = gerarToken(usuarioEncontrado, senhaToken);
        delete usuarioEncontrado.senha;

        return res.json({ usuario: usuarioEncontrado, token });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const detalharUsuario = async (req, res) => {
    const { id } = req.usuario;
    if (!id) return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
    try {
        const { rows: usuariosEncontrados, rowCount } = await encontrarUsuarioPorId(id);
        if (rowCount < 1) return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });

        const usuarioEncontrado = usuariosEncontrados[0];
        delete usuarioEncontrado.senha;

        return res.json(usuarioEncontrado);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const atualizarUsuario = async (req, res) => {
    const { id } = req.usuario;
    if (!id) return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });

    try {
        const { nome, email, senha } = req.body;
        const emailEncontrado = await encontrarEmailUsuario(email);
        if (emailEncontrado.rowCount > 0 && emailEncontrado.rows[0].id !== id) return res.status(400).json({ mensagem: 'O e-mail informado já está sendo utilizado por outro usuário.' });

        const senhaCriptografada = await criptograrSenha(senha);
        const usuario = { nome, email, senhaCriptografada, id };

        await atualizarUsuarioBD(usuario);
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};
module.exports = {
    cadastrarUsuario,
    logarUsuario,
    detalharUsuario,
    atualizarUsuario
};