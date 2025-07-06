let currentTotal = 0;
let playerTurn = 1;
let winner = null;

const totalEl = document.getElementById("total");
const statusEl = document.getElementById("status");
const historyEl = document.getElementById("history");
const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");

function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => { });
}

function playWinSound() {
  winSound.currentTime = 0;
  winSound.play().catch(() => { });
}

function addNumber(num) {
  if (winner !== null) return;

  playClickSound();
  currentTotal += num;

  const entry = document.createElement("li");
  entry.className = "list-group-item animate__animated animate__fadeIn";
  entry.textContent = `Player ${playerTurn} added ${num} → ${currentTotal}`;
  historyEl.prepend(entry);

  totalEl.textContent = currentTotal;

  if (currentTotal === 20) {
    winner = playerTurn;
    statusEl.textContent = `🎉 Player ${playerTurn} Wins!`;
    statusEl.classList.remove("text-info");
    statusEl.classList.add("text-success");
    playWinSound();
    confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
  } else if (currentTotal > 20) {
    winner = playerTurn === 1 ? 2 : 1;
    statusEl.textContent = `🚫 Over 20! Player ${winner} Wins!`;
    statusEl.classList.remove("text-info");
    statusEl.classList.add("text-danger");
    playWinSound();
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
  } else {
    playerTurn = playerTurn === 1 ? 2 : 1;
    statusEl.textContent = `Player ${playerTurn}'s Turn`;
  }
}

function resetGame() {
  currentTotal = 0;
  playerTurn = 1;
  winner = null;
  totalEl.textContent = "0";
  statusEl.textContent = "Player 1's Turn";
  statusEl.className = "fs-5 text-info";
  historyEl.innerHTML = "";
}
