const { Pool } = require('pg');
const { hostBD, portBD, userBD, passwordBD, databaseBD } = require('../../dadosSensiveis');

const pool = new Pool({
    host: hostBD,
    port: portBD,
    user: userBD,
    password: passwordBD,
    database: databaseBD
});

module.exports = pool;