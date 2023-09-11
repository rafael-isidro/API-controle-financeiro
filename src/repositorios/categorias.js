const pool = require('../config/conexao');

const encontrarCategorias = () => {
    const queryEncontrarCategorias = `
            SELECT 
                *
            FROM 
                categorias
        `;
    const categoriasEncontradas = pool.query(queryEncontrarCategorias);

    return categoriasEncontradas;
};

module.exports = {
    encontrarCategorias
};