let timer;
let isRunning = false;
let timeLeft = 25 * 60;
let pomodoroHistory = [];

const startButton = document.getElementById('startBtn');
const resetButton = document.getElementById('resetBtn');
const timerDisplay = document.getElementById('timer');
const pomodoroInput = document.getElementById('pomodoroInput');
const colorPicker = document.getElementById('colorPicker');
const historyList = document.getElementById('historyList');

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Função para atualizar o tempo com base na escolha do usuário
function updateTimeFromInput() {
  if (!isRunning) {
    const selectedTime = parseInt(pomodoroInput.value, 10);
    if (!isNaN(selectedTime) && selectedTime > 0) {
      timeLeft = selectedTime * 60;
      updateTimerDisplay();
    }
  }
}

// Função para iniciar ou pausar o timer **sem resetar** ao retomar
function toggleTimer() {
  if (isRunning) {
    clearInterval(timer); // Pausa
    isRunning = false;
    startButton.textContent = 'Continuar';
  } else {
    isRunning = true;
    startButton.textContent = 'Pausar';

    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        startButton.textContent = 'Iniciar';
        alert('Pomodoro concluído!');
        addPomodoroToHistory();
      }
    }, 1000);
  }
}

// Função para adicionar uma sessão ao histórico
function addPomodoroToHistory() {
  const completedTime = pomodoroInput.value || 25;
  const timestamp = new Date().toLocaleString();
  pomodoroHistory.push(`Sessão de ${completedTime} min - Finalizada em ${timestamp}`);
  updateHistoryDisplay();
}

// Função para atualizar a exibição do histórico
function updateHistoryDisplay() {
  historyList.innerHTML = "";
  pomodoroHistory.forEach((entry) => {
    const listItem = document.createElement("li");
    listItem.textContent = entry;
    historyList.appendChild(listItem);
  });
}

// Função para resetar **totalmente** o timer
function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 25 * 60;
  startButton.textContent = 'Iniciar';
  updateTimerDisplay();
}

// Função para alterar a cor de fundo
function changeBackgroundColor(event) {
  document.body.style.backgroundColor = event.target.value;
}

updateTimerDisplay();

// Eventos
startButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
pomodoroInput.addEventListener('input', updateTimeFromInput);
colorPicker.addEventListener('input', changeBackgroundColor);
