const questions = {
    hard: [
    {
    question: "1. Qual foi a linguagem de programação mais comum para criação de jogos de SNES?",
    options: ["a) C", "b) Java", "c) c++", "d) Assembly"],
    answer: 3
    },
    {
    question: "2. Qual o tipo de código que era usado para armazenar os dados referentes as memórias de um jogo programado em Assembly?",
    options: ["a) ''Binário", "b) Octal", "c) Decimal", "d) Hexadecimal"],
    answer: 3
    },
    {
    question: "3. Qual a linguagem que o Google criou?",
    options: ["a) Go", "b) Kotlin", "c) C++", "d) C#"],
    answer: 0
    },
    {
    question: "4. Supondo que você está gerenciando um banco em python, qual destas variáveis você tem mais precisão para armazenar dinheiro?",
    options: ["a) Float", "b) Int", "c) String", "d) Varchar"],
    answer: 1
    },
    {
    question: "5. Em qual ano bateu fortemente a preocupação do bug do milênio?",
    options: ["a) 1998", "b) 1999", "c) 2000", "d) 2001"],
    answer: 0
    },
    {
    question: "6. O que faz uma list comprehension em Python?",
    options: ["a) Cria dicionários", "b) cria listas completas", "c) define funções", "d) trata erros"],
    answer: 1
    },
    {
    question: "7. O que significa o C da sigla MVC?",
    options: ["a) Control", "b) Controle", "c) Controller", "d) Controllers"],
    answer: 2
    },
    {
    question: "8. Qual o arquivo que acompanha o .java se tratando de Android?",
    options: ["a) .db", "b) .xml", "c) .trace", "d) .bat"],
    answer: 1
    },
    {
    question: "9. O que é o event loop?",
    options: ["a) Cria várias threads", "b) verifica se há erros", "c) Gerencia eventos e código assíncrono", "d) Otimiza loops"],
    answer: 2
    },
    {
    question: "10. Qual a principal diferença entre interface e classe abstrata em Java?",
    options: ["a) Interface tem métodos concretos", "b) Pode-se implementar várias interfaces", "c) Classes abstratas definem estados", "d) SK8 de dedo é do balacobaco"],
    answer: 3
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
  window.location.href = "quiz_gustavo.html";
}
    
    function goToMenu() {
      window.location.href = "../../quiz_comunidade/comunidade.html";
    }
    
    
    // Salva a dificuldade escolhida
    function selectLevel(level) {
      localStorage.setItem('selectedLevel', level);
      window.location.href = "index.html";
    }