
const player = document.getElementById('player-score');
const computer = document.getElementById('computer-score');
const rockBtn = document.getElementById('rock-btn');
const paperBtn = document.getElementById('paper-btn');
const scissorBtn = document.getElementById('scissor-btn');
const tryAgainBtn = document.getElementById('try-again');
const restartBtn = document.getElementById('restart');
const feedback = document.getElementById('feed-back');
const winnerMsg = document.getElementById('winner-msg');

const options = ['Rock', 'Paper', 'Scissor'];
let computerScore = 0;
let playerScore = 0;

function generateComputerScore() {
    return options[Math.floor(Math.random() * options.length)];
}

function givePoints(playerPick) {
    restartBtn.style.display = 'inline-block';
    const computerPick = generateComputerScore();
    if (playerPick === 'Rock' && computerPick === 'Scissor' || 
        playerPick === 'Scissor' && computerPick === 'Paper' ||
        playerPick === 'Paper' && computerPick === 'Rock') {
        playerScore++;
        player.textContent = playerScore;
        feedback.textContent = `${playerPick} beats ${computerPick}! Player wins the round.`;
    } else if (playerPick === computerPick) {
        feedback.textContent = `It's a tie! Both picked ${playerPick}`;
    } else {
        computerScore++;
        computer.textContent = computerScore;
        feedback.textContent = `${computerPick} beats ${playerPick}! Computer wins the round.`;
    }
    if (playerScore === 3 || computerScore === 3) {
        tryAgainBtn.style.display = 'inline-block';
        winnerMsg.textContent = playerScore === 3 ? 'Player Wins!' : 'Computer Wins!';
        [rockBtn, paperBtn, scissorBtn, restartBtn].forEach(btn => {
            btn.style.display = 'none'
        });
        return;
    }
}

function reset() {
    player.textContent = 0;
    computer.textContent = 0;
    winnerMsg.textContent = '';
}

function resetScores() {
    playerScore = 0;
    computerScore = 0;
}

[rockBtn, paperBtn, scissorBtn].forEach((btn) => {
    btn.addEventListener('click', () => givePoints(btn.textContent));
});

restartBtn.addEventListener('click', () => {
    feedback.textContent = '';
    reset();
    resetScores();
    restartBtn.style.display = 'none';
});

tryAgainBtn.addEventListener('click', () => {
    reset();
    resetScores();
    [rockBtn, paperBtn, scissorBtn, restartBtn].forEach(btn => {
        btn.style.display = 'inline-block'
    });
    feedback.textContent = '';
    tryAgainBtn.style.display = 'none';
    restartBtn.style.display = 'none';
});