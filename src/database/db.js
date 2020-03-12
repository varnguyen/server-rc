/**
 * @Created by MinJa 
 * on 06/03/2020.
 */

'use strict';
const mysql = require('mysql');

// Create a connection to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Minhnc@1234",
    database: process.env.DB_NAME || "db_node_api"
});

// open the MySQL connection
db.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = db