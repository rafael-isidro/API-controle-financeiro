const express = require('express');
const pool = require('./config/conexao');
const rotas = require('./rotas/rotas.js');

const app = express();
app.use(express.json());

app.use(rotas);

app.listen(3000);