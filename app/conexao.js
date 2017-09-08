"use strict"

const mysql = require('mysql');

const connection = mysql.createConnection ({
    database:  'denguend',
    host:      'localhost',
    user:      'root',
    password:  'm4th3us'
});

connection.connect(function(err) {
    if (err) {
        console.error("Error connecting: " + err.stack);
        return;
    }
    console.log("Connected");
});

module.exports = connection;