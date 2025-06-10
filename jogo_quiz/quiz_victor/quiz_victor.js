const questions = {
    hard: [
      {
        question: "1. Qual o jogador com mais titulos na historia do futebol?",
        options: ["a) Pelé", "b) 2 Cristiano Ronaldo ", "c) Lionel Messi", "d) Daniel Alves"],
        answer: 2
      },
      {
        question: "2. Qual o jogador com mais vitorias na historia do futebol?",
        options: ["a) Lionel Messi ", "b) Cristiano Ronaldo ", "c) Casillas ", "d) Pelé "],
        answer: 1
      },
      {
        question: "3. Qual desses jogadores não possui o premio puskas ( gol mais bonito da temporada )?",
        options: ["a)Wendell Lira ", "b) James Rodríguez ", "c) Neymar ", "d) Lionel Messi "],
        answer: 3
      },
      {
        question: "4. Quantas Champions tem o Barcelona?",
        options: ["a) 4 ", "b) 3 ", "c) 5 ", "d) 6 "],
        answer: 2
      },
      {
        question: "5.Qual seleção foi campeã da Eurocopa 2016?",
        options: ["a) França ", "b) Espanha ", "c) Portugal ", "d) Alemanha "],
        answer: 2
      },
      {
        question: "6. Qual desses clubes nunca venceu uma Champions League? ",
        options: ["a) Arsenal ", "b) Chelsea ", "c) Borussia Dormunt ", "d) Porto "],
        answer: 0
      },
      {
        question: "7. Quem foi o artilheiro da Copa do Mundo 2022?",
        options: ["a) Lionel Messi ", "b) Oliver Giroud ", "c) Kylian Mbappé ", "d) Richarlison"],
        answer: 2
      },
      {
        question: "8. Qual é o jogador com maior número de gols na história do Campeonato Brasileiro? ",
        options: ["a) Romário ", "b) Zico ", "c) Edmundo ", "d) Roberto Dinamite"],
        answer: 3
      },
      {
        question: "9. quem é o maior artilheiro da historia da champions? ",
        options: ["a) Robert Lewandowski", "b) Karin Benzema ", "c) Cristiano Ronaldo ", "d) Lionel Messi "],
        answer: 2
      },
      {
        question: "10. Qual o maior artilheiro da historia da seleção brasileira (em jogos oficiais)? ",
        options: ["a) Ronaldo ", "b) Neymar ", "c) Romário ", "d) Pelé "],
        answer: 1
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
    // Garante que existe uma dificuldade válida
    let level = localStorage.getItem('selectedLevel');
    if (!level || !questions[level]) {
      level = "hard";
      localStorage.setItem('selectedLevel', level);
    }
  
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
  
    const totalQuestions = questions[level].length;
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
  
  // Timer
  function resetTimer() {
    clearInterval(timer);
    timeLeft = 15;
  
    const timerText = document.getElementById("timer");
    const timeFill = document.getElementById("time-fill");
  
    timerText.textContent = `Tempo: ${timeLeft}s`;
    timeFill.style.transition = "none";
    timeFill.style.width = "100%";
    void timeFill.offsetWidth;
    timeFill.style.transition = "width 15s linear";
    timeFill.style.width = "0%";
  
    timer = setInterval(() => {
      timeLeft--;
      timerText.textContent = `Tempo: ${timeLeft}s`;
  
      if (timeLeft <= 0) {
        clearInterval(timer);
        timeFill.style.width = "0%";
        selectAnswer(-1);
      }
    }, 1000);
  }
  
  // Finaliza o quiz e mostra resultados
  function endQuiz() {
    document.getElementById("quiz-container").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");
  
    const name = localStorage.getItem('playerName') || "Anônimo";
    document.getElementById("final-score").textContent = `Sua pontuação foi ${score} de 10`;
  
    updateRanking(name, score);
    displayRanking();
  }

  function stopQuiz() {
    const confirmar = confirm("Tem certeza de que deseja encerrar o quiz agora?");
    if (confirmar) {
      clearInterval(timer); // Para o timer
      endQuiz(); // Vai para a tela de resultado
    }
    }
    
  // Reinicia o quiz
  function restartQuiz() {
    window.location.href = "quiz_victor.html";
  }
  function goToMenu() {
    window.location.href = "../../quiz_comunidade/comunidade.html";
  }
  // (Opcional) Seleção manual de dificuldade
  function selectLevel(level) {
    localStorage.setItem('selectedLevel', level);
    window.location.href = "quiz_victor.html";
  }