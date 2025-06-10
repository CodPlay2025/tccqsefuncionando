const connection = require('./bd');

const tabelas = [
  {
    nome: 'jogadores',
    sql: `CREATE TABLE IF NOT EXISTS jogadores (
      jogador_id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      senha VARCHAR(255) NOT NULL
    )`
  },
  {
    nome: 'quizzes',
    sql: `CREATE TABLE IF NOT EXISTS quizzes (
      quiz_id INT AUTO_INCREMENT PRIMARY KEY,
      nome_quiz VARCHAR(100) NOT NULL,
      criador VARCHAR(100)
    )`
  },
  {
    nome: 'perguntas',
    sql: `CREATE TABLE IF NOT EXISTS perguntas (
      pergunta_id INT AUTO_INCREMENT PRIMARY KEY,
      quiz_id INT NOT NULL,
      texto_pergunta TEXT NOT NULL,
      FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id) ON DELETE CASCADE
    );`
  },
  {
    nome: 'opcoes_resposta',
    sql: `CREATE TABLE IF NOT EXISTS opcoes_resposta (
      opcao_id INT AUTO_INCREMENT PRIMARY KEY,
      pergunta_id INT NOT NULL,
      texto_opcao TEXT NOT NULL,
      indice_opcao INT NOT NULL,
      FOREIGN KEY (pergunta_id) REFERENCES perguntas(pergunta_id) ON DELETE CASCADE
    )`
  },
  {
    nome: 'respostas_certas',
    sql: `CREATE TABLE IF NOT EXISTS respostas_certas (
      pergunta_id INT PRIMARY KEY,
      indice_correto INT NOT NULL,
      FOREIGN KEY (pergunta_id) REFERENCES perguntas(pergunta_id) ON DELETE CASCADE
    )`
  },
  {
    nome: 'rankings',
    sql: `CREATE TABLE IF NOT EXISTS rankings (
      ranking_id INT AUTO_INCREMENT PRIMARY KEY,
      jogador_id INT NOT NULL,
      pontuacao INT NOT NULL CHECK (pontuacao >= 0),
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (jogador_id) REFERENCES jogadores(jogador_id) ON DELETE CASCADE
    )`
  }
];

for (const tabela of tabelas) {
  connection.query(tabela.sql, (err) => {
    if (err) {
      console.error(`Erro ao criar a tabela '${tabela.nome}':`, err.sqlMessage);
    } else {
      console.log(`Tabela '${tabela.nome}' criada ou já existente.`);
    }
  });
}


