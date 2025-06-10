const questions = {
    hard: [
      {
        question: "1. Quantos tipos de Pneus existem nas corridas de F1?",
        image: "../../Imagens/imgOtavio1.png", // caminho da imagem
        options: ["a) 3 - macio, médio e duro", "b) 2 - macio e duro ", "c) 1 - macio", "d) 1 - apenas um tipo para todos"],
        answer: 0
      },
      {
        question: "2. Quantos pilotos existem por equipes?",
        image: "../../Imagens/imgOtavio2.png", // caminho da imagem
        options: ["a) 1 ", "b) 2 ", "c) 3 ", "d) 4 "],
        answer: 1
      },
      {
        question: "3. Qual o piloto com o maior número de vitórias?",
        image: "../../Imagens/imgOtavio3.jpg", // caminho da imagem
        options: ["a)Max Verstappen ", "b) Lewis Hamilton ", "c) Michael Schumacher", "d) Ayrton Senna "],
        answer: 1
      },
      {
        question: "4. Qual o piloto mais novo a obter uma vitória em um Grand Prix de F1?",
        image: "../../Imagens/imgOtavio4.jpg", // caminho da imagem
        options: ["a) Kimi Antonelli ", "b) Gabriel Bortoleto ", "c) Max Verstappen ", "d) Charles Leclerc "],
        answer: 2
      },
      {
        question: "5. Somente dois pilotos detém o recorde de mais títulos mundiais. Quais são eles?",
        image: "../../Imagens/imgOtavio5.jpg", // caminho da imagem
        options: ["a) Verstappen e Senna ", "b) Prost e Fangio ", "c) Vettel e Verstappen ", "d) Hamilton e Schumacher "],
        answer: 3
      },
      {
        question: "6. Qual circuito é considerado pelos pilotos a corrida mais difícil do calendário? ",
        image: "../../Imagens/imgOtavio6.png", // caminho da imagem
        options: ["a) Mônaco ", "b) Bahrein ", "c) São Paulo ", "d) Bélgica "],
        answer: 0
      },
      {
        question: "7. Quantos cavalos um carro de fórmula 1 possui? ",
        image: "../../Imagens/imgOtavio7.png", // caminho da imagem
        options: ["a) 1000cv ", "b) 500cv + 100cv(elétrico) ", "c) 900cv + 110cv(elétrico) ", "d) 1cv"],
        answer: 2
      },
      {
        question: "8. Quantas voltas tem o GP de São Paulo? ",
        image: "../../Imagens/imgOtavio8.jpg", // caminho da imagem
        options: ["a) 71 voltas ", "b) 50 voltas ", "c) 61 voltas ", "d) 10 voltas "],
        answer: 0
      },
      {
        question: "9. Qual o nome do primeiro campeão mundial de fórmula 1? ",
        image: "../../Imagens/imgOtavio9.png", // caminho da imagem
        options: ["a) Giuseppe Farina", "b) Juan Manuel Fangio ", "c) Niki Lauda ", "d) Clay Regazzoni "],
        answer: 0
      },
      {
        question: "10. O que é uma Pole Position? ",
        image: "../../Imagens/imgOtavio10.png", // caminho da imagem
        options: ["a) Quando um piloto ganha uma corrida ", "b) Quando o piloto abandona a corrida ", "c) Quando um piloto toma uma punição ", "d) Quando o piloto faz a volta mais rapida na Classificação "],
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
    answered = false;
    const level = localStorage.getItem('selectedLevel');
    const currentQ = questions[level][currentQuestion];
  
    document.getElementById("question").textContent = currentQ.question;

    const imageElement = document.getElementById("question-image");
if (currentQ.image) {
  imageElement.src = currentQ.image;
  imageElement.classList.remove("hidden");
} else {
  imageElement.classList.add("hidden");
}
  
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
  
    if (selected === correct) {
      score++;
    }
  
    const buttons = document.querySelectorAll("#options button");
    buttons.forEach(btn => btn.disabled = true);
  
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
    window.location.href = "quiz_otavio.html";
  }
  
  function goToMenu() {
    window.location.href = "../../quiz_comunidade/comunidade.html";
  }
  
  // (Opcional) Seleção manual de dificuldade
  function selectLevel(level) {
    localStorage.setItem('selectedLevel', level);
    window.location.href = "quiz_otavio.html";
  }
  