const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '10.67.97.76',       // ou 127.0.0.1
  user: 'aaa',            // seu usuário do MySQL
  password: '123456',            // sua senha (pode estar vazia)
  database: 'bdtcc'        // nome do banco criado previamente
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar:', err);
    return;
  }
  console.log('✅ Conectado ao MySQL!');
});

module.exports = connection;


