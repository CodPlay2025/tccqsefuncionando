const urlParams = new URLSearchParams(window.location.search);
const quizId = urlParams.get('quiz_id');
const modoPersonalizado = quizId !== null;
const feedback = document.getElementById("feedback");

let questions = {
  easy: [
    {
      question: "1. Qual linguagem é usada para estruturar páginas da web?",
      options: ["a) Java", "b) HTML", "c) Python", "d) C++"],
      answer: 1
    },
    {
      question: "2. Qual símbolo é usado para comentários de uma linha em JavaScript?",
      options: ["a) <!--", "b) #", "c) //", "d) /* */"],
      answer: 2
    },
    {
      question: "3. O que significa 'CSS'?",
      options: [
        "a) Computer Style Sheets",
        "b) Cascading Style Sheets",
        "c) Creative Style Syntax",
        "d) Code Style Structure"
      ],
      answer: 1
    },
    {
      question: "4. Qual destes é um loop em JavaScript?",
      options: ["a) repeat", "b) while", "c) loop", "d) cycle"],
      answer: 1
    },
    {
      question: "5. O que o comando console.log() faz?",
      options: [
        "a) Exibe uma janela",
        "b) Cria um alerta",
        "c) Salva um arquivo",
        "d) Mostra algo no console"
      ],
      answer: 3
    },
    {
      question: "6. Qual linguagem é usada para interatividade na web?",
      options: ["a) HTML", "b) JavaScript", "c) SQL", "d) CSS"],
      answer: 1
    },
    {
      question: "7. Qual extensão é usada para arquivos JavaScript?",
      options: ["a) .html", "b) .js", "c) .java", "d) .css"],
      answer: 1
    },
    {
      question: "8. O que é uma variável?",
      options: [
        "a) Uma função",
        "b) Um dado fixo",
        "c) Um espaço para armazenar dados",
        "d) Um estilo de código"
      ],
      answer: 2
    },
    {
      question: "9. Qual destas não é uma linguagem de programação?",
      options: ["a) Python", "b) HTML", "c) Java", "d) C#"],
      answer: 1
    },
    {
      question: "10. Qual comando cria uma variável em JavaScript?",
      options: ["a) define", "b) create", "c) var", "d) make"],
      answer: 2
    }
  ],

  medium: [
    {
      question: "1. O que o método parseInt(\"10.5\") retorna em JavaScript?",
      options: ["a) 10.5", "b) \"10.5\"", "c) 10", "d) NaN"],
      answer: 2
    },
    {
      question: "2. Qual operador representa igualdade estrita em JavaScript?",
      options: ["a) ==", "b) =", "c) ===", "d) !=="],
      answer: 2
    },
    {
      question: "3. Qual estrutura de dados armazena pares chave-valor?",
      options: ["a) Array", "b) Loop", "c) Objeto", "d) String"],
      answer: 2
    },
    {
      question: "4. O que typeof null retorna em JavaScript?",
      options: ["a) null", "b) object", "c) undefined", "d) false"],
      answer: 1
    },
    {
      question: "5. Qual método adiciona um elemento ao final de um array?",
      options: ["a) shift()", "b) push()", "c) pop()", "d) unshift()"],
      answer: 1
    },
    {
      question: "6. Qual navegador criou o JavaScript?",
      options: ["a) Firefox", "b) Safari", "c) Netscape", "d) Chrome"],
      answer: 2
    },
    {
      question: "7. Qual comando repete um bloco até uma condição ser falsa?",
      options: ["a) for", "b) if", "c) function", "d) return"],
      answer: 0
    },
    {
      question: "8. Qual é o resultado de Boolean(0) em JavaScript?",
      options: ["a) true", "b) 0", "c) false", "d) undefined"],
      answer: 2
    },
    {
      question: "9. Qual é um tipo de dado primitivo em JavaScript?",
      options: ["a) array", "b) object", "c) string", "d) function"],
      answer: 2
    },
    {
      question: "10. O que localStorage permite?",
      options: [
        "a) Acessar o banco de dados",
        "b) Armazenar dados temporariamente",
        "c) Armazenar dados no navegador",
        "d) Executar códigos do servidor"
      ],
      answer: 2
    }
  ],

  hard: [
    {
      question: "1. Qual é a saída de [] + [] em JavaScript?",
      options: ["a) 0", "b) []", "c) \"\"", "d) undefined"],
      answer: 2
    },
    {
      question: "2. Qual o valor de typeof NaN?",
      options: ["a) number", "b) NaN", "c) undefined", "d) object"],
      answer: 0
    },
    {
      question: "3. Qual é o escopo de variáveis declaradas com let?",
      options: ["a) Global", "b) De bloco", "c) De função", "d) Dinâmico"],
      answer: 1
    },
    {
      question: "4. O que faz o método bind() em JavaScript?",
      options: [
        "a) Encadeia funções",
        "b) Clona objetos",
        "c) Define o this de uma função",
        "d) Retorna o valor de uma função"
      ],
      answer: 2
    },
    {
      question: "5. Qual destas NÃO é uma forma válida de criar funções?",
      options: [
        "a) function myFunc()",
        "b) const myFunc = () => {}",
        "c) let myFunc = function() {}",
        "d) create function myFunc() {}"
      ],
      answer: 3
    },
    {
      question: "6. O que faz o operador ?? (nullish coalescing)?",
      options: [
        "a) Compara dois valores",
        "b) Retorna o primeiro valor não nulo ou indefinido",
        "c) Concatena strings",
        "d) Executa uma função"
      ],
      answer: 1
    },
    {
      question: "7. Qual o resultado de Object.is(NaN, NaN)?",
      options: ["a) false", "b) true", "c) NaN", "d) undefined"],
      answer: 1
    },
    {
      question: "8. O que Promise.all() faz?",
      options: [
        "a) Executa uma única promise",
        "b) Executa promises em sequência",
        "c) Aguarda todas as promises serem resolvidas",
        "d) Rejeita se uma promise falhar"
      ],
      answer: 2
    },
    {
      question: "9. O que define um closure em JavaScript?",
      options: [
        "a) Uma função dentro de outra",
        "b) Um array",
        "c) Um loop",
        "d) Um objeto"
      ],
      answer: 0
    },
    {
      question: "10. Qual técnica evita o callback hell?",
      options: [
        "a) Usar mais callbacks",
        "b) Usar var ao invés de let",
        "c) Usar Promises ou async/await",
        "d) Colocar tudo em uma função só"
      ],
      answer: 2
    }
  ]
};

window.onload = async function () {
  if (modoPersonalizado && quizId) {
    try {
    const res = await fetch(`http://localhost:3000/quiz/${quizId}`);
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Quiz não encontrado ou vazio");
    }

    // substitui as perguntas
    questions = { custom: data };
    localStorage.setItem("selectedLevel", "custom");

    // inicia o jogo com as perguntas do banco
    startQuiz();
    } catch (err) {
      console.error("Erro ao carregar quiz do banco:", err);
      alert("Quiz inválido ou indisponível.");
    window.location.href = "../quiz_comunidade/comunidade.html";
    }
  } else {
    // fallback: se não for personalizado
    const level = localStorage.getItem('selectedLevel');
    if (level && questions[level]) {
      startQuiz();
    } else {
      alert("Quiz inválido.");
    window.location.href = "../quiz_comunidade/comunidade.html";
    }
  }
};
  
  // Variáveis de controle
  let currentQuestion = 0;
  let score = 0;
  let timer;
  let timeLeft = 15;
  let answered = false;
  
  // Início do quiz
  function startQuiz() {
    /*
    const nameInput = document.getElementById('player-name');
    const name = nameInput.value.trim();
    */


    const level = localStorage.getItem('selectedLevel');
  
    /*
    if (!name) {
      alert("Por favor, digite seu nome.");
      return;
    }
  
    if (!level) {
      alert("Por favor, selecione a dificuldade antes.");
      return;
    } 
  
    localStorage.setItem('playerName', name);
    */
  
    document.getElementById('name-screen').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
  
    currentQuestion = 0;
    score = 0;
    showQuestion();
    startTimer();
  }
  
  // Mostra a pergunta atual
  function showQuestion() {

    //Transição entre as perguntas
    const quizBox = document.getElementById("quiz-container");
    quizBox.classList.remove("fade-in");
    quizBox.classList.add("fade-out");
    setTimeout(() => {

    answered = false;
    const level = localStorage.getItem('selectedLevel');
    const currentQuestions = questions[level];
    const currentQ = currentQuestions[currentQuestion];
  
    // Atualiza a pergunta e opções
    document.getElementById("question").textContent = currentQ.question;
  
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
  
    currentQ.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.onclick = () => selectAnswer(index);
      button.style.backgroundColor = "";
      button.style.color = "";
      button.style.opacity = 1;
      button.disabled = false;
      button.style.transition = "all 0.3s ease"; // animação suave

      optionsContainer.appendChild(button);
    });
  
    // Atualiza o contador de questão
    const totalQuestions = currentQuestions.length;
    const counterText = `Questão ${currentQuestion + 1} de ${totalQuestions}`;
    document.getElementById("question-counter").textContent = counterText;
  
    resetTimer();

    //Transição entre as perguntas
    quizBox.classList.remove("fade-out");
    quizBox.classList.add("fade-in");
    }, 500);}
  
  // Seleciona a resposta e verifica se está certa
  function selectAnswer(selected) {
    if (answered) return;
    answered = true;
  
    clearInterval(timer);
  
    const level = localStorage.getItem('selectedLevel');
    const currentQ = questions[level][currentQuestion];
    const correct = currentQ.answer;
  
    if (selected === correct) {
      score++;
    }
  
    // Desativa os botões para evitar múltiplos cliques
    const buttons = document.querySelectorAll("#options button");

    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === correct) {
        btn.style.backgroundColor = "#4CAF50"; // verde
        btn.style.color = "#fff";
      } else if (i === selected) {
        btn.style.backgroundColor = "#f44336"; // vermelho
        btn.style.color = "#fff";
      } else {
        btn.style.opacity = 0.6;
      }
    });
  
    // Vai para próxima pergunta depois de um tempo
    setTimeout(() => {
      feedback.classList.add("hidden");
      nextQuestion();
    }, 1500);
  }
  
  
  // Vai para a próxima pergunta ou finaliza
  function nextQuestion() {
    const level = localStorage.getItem('selectedLevel');
    currentQuestion++;
  
    if (currentQuestion < questions[level].length) {
      showQuestion();
      startTimer();
    } else {
      endQuiz();
    }
  }
  
  // Reinicia o timer
  function resetTimer() {
    clearInterval(timer);
    timeLeft = 15;
  
    const timerText = document.getElementById("timer");
    const timeFill = document.getElementById("time-fill");
  
    // Reset do texto e da barra instantaneamente
    timerText.textContent = `Tempo: ${timeLeft}s`;
    timeFill.style.transition = "none";
    timeFill.style.width = "100%";
  
    // Força o reflow para garantir que a transição funcione
    void timeFill.offsetWidth;
  
    // Inicia a transição da barra para 0% em 15s
    timeFill.style.transition = "width 15s linear";
    timeFill.style.width = "0%";
  
    // Atualiza o cronômetro a cada segundo
    timer = setInterval(() => {
      timeLeft--;
      timerText.textContent = `Tempo: ${timeLeft}s`;
  
      if (timeLeft <= 0) {
        clearInterval(timer);
        timeFill.style.width = "0%"; // Garante barra cheia para vazia
        selectAnswer(-1); // Considera como erro se não responder
      }
    }, 1000);
  }
  
  
  
  
  // Finaliza o quiz e mostra resultados
  function endQuiz() {
document.getElementById("quiz-container").classList.add("hidden");
document.getElementById("result-screen").classList.remove("hidden");

const name = localStorage.getItem('playerName');
document.getElementById("final-score").textContent = `Sua pontuação foi ${score}`;

updateRanking(name, score);
displayRanking();

// Limpa modo personalizado após o fim
localStorage.removeItem('modoPersonalizado');
localStorage.removeItem('quizPersonalizadoId');
}

  function stopQuiz() {
  const confirmar = confirm("Tem certeza de que deseja encerrar o quiz agora?");
  if (confirmar) {
    clearInterval(timer); // Para o timer
    endQuiz(); // Vai para a tela de resultado
  }
  }

  
  // Atualiza o ranking no localStorage
  function updateRanking(name, score) {
    const level = localStorage.getItem('selectedLevel');
    const rankingKey = `quizRanking_${level}`;
    let ranking = JSON.parse(localStorage.getItem(rankingKey)) || [];
  
    const existing = ranking.find(p => p.name === name);
    if (!existing || score > existing.score) {
      ranking = ranking.filter(p => p.name !== name);
      ranking.push({ name, score });
    }
  
    ranking.sort((a, b) => b.score - a.score);
    localStorage.setItem(rankingKey, JSON.stringify(ranking.slice(0, 5)));
  }
  
  // Mostra o ranking na tela
  function displayRanking() {
    const level = localStorage.getItem('selectedLevel');
    const rankingKey = `quizRanking_${level}`;
    const rankingList = document.getElementById("ranking-list");
    const ranking = JSON.parse(localStorage.getItem(rankingKey)) || [];
  
    rankingList.innerHTML = "";
    ranking.forEach((player, index) => {
      const li = document.createElement("li");
      li.textContent = `${index + 1}. ${player.name}: ${player.score}`;
      rankingList.appendChild(li);
    });
  }
  
  // Reinicia o quiz
  function restartQuiz() {
    window.location.href = "dificuldade.html";
  }
  
  function goToMenu() {
    window.location.href = "../tela_quiz/explorer.html";
  }
  
  
  // Salva a dificuldade escolhida
  function selectLevel(level) {
    localStorage.setItem('selectedLevel', level);
    window.location.href = "index.html";
  }

  window.onload = function () {
    const startBtn = document.getElementById("start-button");
    if (!modoPersonalizado && startBtn) {
      startBtn.addEventListener("click", () => {
        startQuiz();
      });
    }
  };