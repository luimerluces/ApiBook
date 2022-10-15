const mysql = require('mysql');
const MY_Configuration = require('../constante/constante');
const configLibrary = {
  user: MY_Configuration.userBD,
  password: MY_Configuration.passwordBD,
  server: MY_Configuration.serverBD,
  database: MY_Configuration.database,
  port: MY_Configuration.port
}
const dbConnection = mysql.createConnection(configLibrary);
  dbConnection.connect((err) => {
    if (err) throw err;  
    console.log('Conectado a Mysql Base de Datos Library');
  });
  
  module.exports = {
    dbConnection
}