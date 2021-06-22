const Pool = require("pg").Pool;

const pool = new Pool ({
    user: "me",
    password: "password",
    database: "pastes", 
    host: "localhost",
    port: 5432
});

module.exports = pool;