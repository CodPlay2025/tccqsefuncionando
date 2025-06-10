const express = require('express');
const app = express();
const PORT = 3000;
const connection = require('./bd'); // importa a conexão com o MySQL
const cors = require('cors');
const path = require('path');

app.use(express.static(path.join(__dirname, '..')));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROTA DE LOGIN
app.post('/login', (req, res) => {
  const { user, senha } = req.body;

  const query = 'SELECT * FROM jogadores WHERE nome = ? AND senha = ?';
  connection.query(query, [user, senha], (err, results) => {
    if (err) {
      console.error('Erro na consulta:', err);
      return res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }

    if (results.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Usuário ou senha incorretos.' });
    }
  });
});

app.post('/cadastro', (req, res) => {
  const { user, senha } = req.body;

  if (!user || !senha) {
    return res.status(400).json({ success: false, message: 'Usuário e senha são obrigatórios.' });
  }

  const query = 'INSERT INTO jogadores (nome, senha) VALUES (?, ?)';
  connection.query(query, [user, senha], (err, result) => {
    if (err) {
      console.error('Erro ao inserir usuário:', err);
      return res.status(500).json({ success: false, message: 'Erro ao cadastrar usuário.' });
    }

    res.json({ success: true });
  });
});

app.post('/quiz', async (req, res) => {
  const { nomeQuiz, criador, perguntas } = req.body;
  if (!nomeQuiz || !criador || !Array.isArray(perguntas) || perguntas.length !== 10) {
    return res.status(400).json({ success: false, message: 'Dados incompletos.' });
  }

  const db = connection.promise();

  try {
    // Cria um quiz
    const [quizResult] = await db.query(
    'INSERT INTO quizzes (nome_quiz, criador) VALUES (?, ?)',
    [nomeQuiz, criador]
    );
    const quizId = quizResult.insertId;
    console.log('Quiz criado com ID:', quizId);
    // Salva cada pergunta com o quiz_id
    for (const p of perguntas) {
      const [perguntaResult] = await db.query(
      'INSERT INTO perguntas (texto_pergunta, quiz_id) VALUES (?, ?)',
      [p.pergunta, quizId]
      );
      const perguntaId = perguntaResult.insertId;

      const alternativas = [
      p.alternativa_a,
      p.alternativa_b,
      p.alternativa_c,
      p.alternativa_d
      ];

      for (let i = 0; i < alternativas.length; i++) {
        await db.query(
        'INSERT INTO opcoes_resposta (pergunta_id, texto_opcao, indice_opcao) VALUES (?, ?, ?)',
        [perguntaId, alternativas[i], i]
        );
      }

      const mapaIndice = { A: 0, B: 1, C: 2, D: 3 };
      const indiceCorreto = mapaIndice[p.correta.toUpperCase()];
      await db.query(
      'INSERT INTO respostas_certas (pergunta_id, indice_correto) VALUES (?, ?)',
      [perguntaId, indiceCorreto]
      );
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Erro ao salvar quiz:', err);
    res.status(500).json({ success: false, message: 'Erro ao salvar quiz.' });
  }
});

app.get('/quizzes', async (req, res) => {
  const db = connection.promise();
  try {
    const [rows] = await db.query( 'SELECT quiz_id, nome_quiz, criador FROM quizzes');
    res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar quizzes:', err);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

app.get('/quiz/:id', async (req, res) => {
  const db = connection.promise();
  const quizId = req.params.id;
  try {
    const [perguntas] = await db.query('SELECT pergunta_id, texto_pergunta FROM perguntas WHERE quiz_id = ?', [quizId]);
    const quiz = [];
    for (const p of perguntas) {
      const [opcoes] = await db.query('SELECT texto_opcao FROM opcoes_resposta WHERE pergunta_id = ? ORDER BY indice_opcao', [p.pergunta_id]);
      const [correta] = await db.query('SELECT indice_correto FROM respostas_certas WHERE pergunta_id = ?', [p.pergunta_id]);
    
      quiz.push({
        question: p.texto_pergunta,
        options: opcoes.map(o => o.texto_opcao),
        answer: correta[0].indice_correto
      });
    }
    
    res.json(quiz);
  } catch (err) {
    console.error('Erro ao carregar quiz:', err);
    res.status(500).json({ error: 'Erro ao carregar quiz.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});