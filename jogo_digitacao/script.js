const words = [
    "html", "css", "javascript", "tag", "elemento",
    "div", "span", "header", "footer", "section",
    "article", "nav", "input", "button", "form",
    "label", "id", "class", "style", "color",
    "margin", "padding", "border", "background", "display",
    "flex", "grid", "inline", "block", "responsive",
    "mediaquery", "hover", "focus", "transition", "animation",
    "keyframes", "event", "onclick", "oninput", "addEventListener",
    "querySelector", "innerHTML", "textContent", "loop",
    "array", "function", "variavel", "constante", "ifelse"
//adicionar mais palavras aq q to sem ideia pfv
];

let currentWord = "";
let score = 0;
let timeLeft = 30;
let timer;

// Elementos da tela
const wordDisplay = document.getElementById('word-display');
const wordInput = document.getElementById('word-input');
const timerText = document.getElementById('timer');
const timeFill = document.getElementById('time-fill');
const scoreText = document.getElementById('score');
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const finalScore = document.getElementById('final-score');

function startGame() {
    startScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    startTypingGame();
}

function startTypingGame() {
    score = 0;
    timeLeft = 30;
    updateScore();
    newWord();
    wordInput.value = '';
    wordInput.focus();
    startTimer();
}

function newWord() {
    const index = Math.floor(Math.random() * words.length);
    currentWord = words[index];
    wordDisplay.textContent = currentWord;
}

// ✅ Verifica quando aperta Enter
wordInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkWord();
    }
});

function checkWord() {
    const input = wordInput.value.trim().toLowerCase();
    if (input === currentWord.toLowerCase()) {
        score++;
        timeLeft = Math.min(timeLeft + 3, 30); // aumenta tempo
    } else {
        timeLeft = Math.max(timeLeft - 2, 0); // penaliza erro
    }

    updateScore();
    wordInput.value = '';
    newWord();
}

function startTimer() {
    clearInterval(timer);
    updateTimerBar();

    timer = setInterval(() => {
        timeLeft--;
        updateTimerBar();

        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function updateTimerBar() {
    timerText.textContent = `Tempo: ${timeLeft}s`;
    timeFill.style.width = `${(timeLeft / 30) * 100}%`;
}

function updateScore() {
    scoreText.textContent = `Pontuação: ${score}`;
}

function endGame() {
    gameScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    finalScore.textContent = `Sua pontuação foi: ${score}`;
}

function stopDigitacao() {
    const confirmar = confirm("Tem certeza de que deseja encerrar o jogo agora?");
    if (confirmar) {
      clearInterval(timer); // Para o timer
      endGame(); // Vai para a tela de resultado
    }
}

function restartTyping() {
    startTypingGame();
}

function goToMenu() {
    window.location.href = "../tela_menu/menu.html";
}
