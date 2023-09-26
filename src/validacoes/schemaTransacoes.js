const joi = require('joi');

const schemaTransacoes = joi.object({
    tipo: joi.string().valid('entrada', 'saida').required().messages({
        'any.required': 'O campo tipo é obrigatório',
        'string.base': 'O campo tipo deve conter apenas letras',
        'any.only': 'O campo tipo deve ser "entrada" ou "saida"',
        'string.empty': 'O campo tipo é obrigatório',
    }),

    descricao: joi.string().required().messages({
        'any.required': 'O campo descrição é obrigatório',
        'string.empty': 'O campo descrição é obrigatório',
    }),

    valor: joi.number().positive().required().messages({
        'number.positive': 'O campo valor precisa ser um número positivo',
        'number.base': 'O campo valor precisa ser um número',
    }),

    data: joi.date().iso().required().messages({
        'any.required': 'O campo data é obrigatório',
        'date.base': 'O campo data precisa estar em um formato válido.'
    }),

    categoria_id: joi.number().positive().messages({
        'number.positive': 'O campo valor precisa ser um número positivo',
        'number.base': 'O campo valor precisa ser um número',
    }),
});

module.exports = {
    schemaTransacoes
};