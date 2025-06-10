const connection = require('./bd');

const sql = `INSERT INTO jogadores (nome, email, senha)
             VALUES ('admin', 'admin@teste.com', '1234')`;

connection.query(sql, (err, result) => {
  if (err) {
    console.error('Erro ao inserir:', err.message);
  } else {
    console.log('Usuário admin inserido com sucesso!');
  }
  connection.end();
});
