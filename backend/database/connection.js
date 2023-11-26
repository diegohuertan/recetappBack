const mysql = require('mysql');

const connectionConfig = {
  host: 'localhost',
  user: 'root',
  password: 'diego123',
  database: 'recetapp_bd',
};

const connection = mysql.createConnection(connectionConfig);

// La conexión se crea una sola vez al cargar este módulo
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    throw err;
  }
  console.log('Conexión a la base de datos establecida');
});

module.exports = connection;