
// Perguntas separadas por nível de dificuldade
const questions = {
    easy: [
      {
        question: "Qual linguagem é usada para estruturar páginas da web?",
        options: ["Java", "HTML", "Python", "C++"],
        answer: 1
      },
      {
        question: "Qual símbolo é usado para comentários de uma linha em JavaScript?",
        options: ["<!--", "#", "//", "/* */"],
        answer: 2
      },
      {
        question: "O que significa 'CSS'?",
        options: [
          "Computer Style Sheets",
          "Cascading Style Sheets",
          "Creative Style Syntax",
          "Code Style Structure"
        ],
        answer: 1
      },
      {
        question: "Qual destes é um loop em JavaScript?",
        options: ["repeat", "while", "loop", "cycle"],
        answer: 1
      },
      {
        question: "O que o comando console.log() faz?",
        options: [
          "Exibe uma janela",
          "Cria um alerta",
          "Salva um arquivo",
          "Mostra algo no console"
        ],
        answer: 3
      },
      {
        question: "Qual linguagem é usada para interatividade na web?",
        options: ["HTML", "JavaScript", "SQL", "CSS"],
        answer: 1
      },
      {
        question: "Qual extensão é usada para arquivos JavaScript?",
        options: [".html", ".js", ".java", ".css"],
        answer: 1
      },
      {
        question: "O que é uma variável?",
        options: [
          "Uma função",
          "Um dado fixo",
          "Um espaço para armazenar dados",
          "Um estilo de código"
        ],
        answer: 2
      },
      {
        question: "Qual destas não é uma linguagem de programação?",
        options: ["Python", "HTML", "Java", "C#"],
        answer: 1
      },
      {
        question: "Qual comando cria uma variável em JavaScript?",
        options: ["define", "create", "var", "make"],
        answer: 2
      }
  
  
  
  
  
  
    ],
    medium: [
      {
        question: "O que o método parseInt(\"10.5\") retorna em JavaScript?",
        options: ["10.5", "\"10.5\"", "10", "NaN"],
        answer: 2
      },
      {
        question: "Qual operador representa igualdade estrita em JavaScript?",
        options: ["==", "=", "===", "!=="],
        answer: 2
      },
      {
        question: "Qual estrutura de dados armazena pares chave-valor?",
        options: ["Array", "Loop", "Objeto", "String"],
        answer: 2
      },
      {
        question: "O que typeof null retorna em JavaScript?",
        options: ["null", "object", "undefined", "false"],
        answer: 1
      },
      {
        question: "Qual método adiciona um elemento ao final de um array?",
        options: ["shift()", "push()", "pop()", "unshift()"],
        answer: 1
      },
      {
        question: "Qual navegador criou o JavaScript?",
        options: ["Firefox", "Safari", "Netscape", "Chrome"],
        answer: 2
      },
      {
        question: "Qual comando repete um bloco até uma condição ser falsa?",
        options: ["for", "if", "function", "return"],
        answer: 0
      },
      {
        question: "Qual é o resultado de Boolean(0) em JavaScript?",
        options: ["true", "0", "false", "undefined"],
        answer: 2
      },
      {
        question: "Qual é um tipo de dado primitivo em JavaScript?",
        options: ["array", "object", "string", "function"],
        answer: 2
      },
      {
        question: "O que localStorage permite?",
        options: [
          "Acessar o banco de dados",
          "Armazenar dados temporariamente",
          "Armazenar dados no navegador",
          "Executar códigos do servidor"
        ],
        answer: 2
      }
    ],
    hard: [
      {
        question: "Qual é a saída de [] + [] em JavaScript?",
        options: ["0", "[]", "\"\"", "undefined"],
        answer: 2
      },
      {
        question: "Qual o valor de typeof NaN?",
        options: ["number", "NaN", "undefined", "object"],
        answer: 0
      },
      {
        question: "Qual é o escopo de variáveis declaradas com let?",
        options: ["Global", "De bloco", "De função", "Dinâmico"],
        answer: 1
      },
      {
        question: "O que faz o método bind() em JavaScript?",
        options: [
          "Encadeia funções",
          "Clona objetos",
          "Define o this de uma função",
          "Retorna o valor de uma função"
        ],
        answer: 2
      },
      {
        question: "Qual destas NÃO é uma forma válida de criar funções?",
        options: [
          "function myFunc()",
          "const myFunc = () => {}",
          "let myFunc = function() {}",
          "create function myFunc() {}"
        ],
        answer: 3
      },
      {
        question: "O que faz o operador ?? (nullish coalescing)?",
        options: [
          "Compara dois valores",
          "Retorna o primeiro valor não nulo ou indefinido",
          "Concatena strings",
          "Executa uma função"
        ],
        answer: 1
      },
      {
        question: "Qual o resultado de Object.is(NaN, NaN)?",
        options: ["false", "true", "NaN", "undefined"],
        answer: 1
      },
      {
        question: "O que Promise.all() faz?",
        options: [
          "Executa uma única promise",
          "Executa promises em sequência",
          "Aguarda todas as promises serem resolvidas",
          "Rejeita se uma promise falhar"
        ],
        answer: 2
      },
      {
        question: "O que define um closure em JavaScript?",
        options: [
          "Uma função dentro de outra",
          "Um array",
          "Um loop",
          "Um objeto"
        ],
        answer: 0
      },
      {
        question: "Qual técnica evita o callback hell?",
        options: [
          "Usar mais callbacks",
          "Usar var ao invés de let",
          "Usar Promises ou async/await",
          "Colocar tudo em uma função só"
        ],
        answer: 2
      }
    ]
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
    answered = false;
    const level = localStorage.getItem('selectedLevel');
    const currentQ = questions[level][currentQuestion];
  
    document.getElementById("question").textContent = currentQ.question;
  
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
  
    currentQ.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.onclick = () => selectAnswer(index);
      optionsContainer.appendChild(button);
    });
  
    resetTimer();
  }
  
  // Seleciona a resposta e verifica se está certa
  function selectAnswer(selected) {
    if (answered) return;
    answered = true;
  
    clearInterval(timer);
  
    const level = localStorage.getItem('selectedLevel');
    const currentQ = questions[level][currentQuestion];
    const correct = currentQ.answer;
  
    const feedback = document.getElementById("feedback");
    feedback.classList.remove("hidden");
    feedback.textContent = selected === correct ? "✅ ACERTOU!" : "❌ ERROU!";
    feedback.style.color = selected === correct ? "green" : "red";
    feedback.style.fontWeight = "bold";
    feedback.style.fontSize = "1.5rem";
    feedback.style.textAlign = "center";
  
    if (selected === correct) {
      score++;
    }
  
    // Desativa os botões para evitar múltiplos cliques
    const buttons = document.querySelectorAll("#options button");
    buttons.forEach(btn => btn.disabled = true);
  
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
    document.getElementById("final-score").textContent = ` Sua pontuação foi ${score}`;
  
    updateRanking(name, score);
    displayRanking();
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
    window.location.href = "../modelo_dificuldade/explorer.html";
  }
  
  
  // Salva a dificuldade escolhida
  function selectLevel(level) {
    localStorage.setItem('selectedLevel', level);
    window.location.href = "index.html";
  }