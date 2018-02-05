var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'nea.c7soqmonzoo9.eu-west-2.rds.amazonaws.com',
    user: 'subhan1234',
    password: 'Subhan1234',
    database: 'app'
});

module.exports = connection;