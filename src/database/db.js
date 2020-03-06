'use strict';
const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Minhnc@1234",
    database: process.env.DB_NAME || "db_node_api"
});

module.exports = db