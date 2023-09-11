const { encontrarCategorias } = require("../repositorios/categorias");

const listarCategorias = async (req, res) => {
    try {
        const categoriasEncontradas = await encontrarCategorias();
        if (categoriasEncontradas.rowCount < 1) return res.status(404).json({ mensagem: 'Nenhuma categoria foi encontrada.' });

        return res.status(200).json(categoriasEncontradas.rows);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = { listarCategorias };