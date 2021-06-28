/* This project is part of The Web Developer Bootcamp 2021, by Colt Steele.
Most of the project was done by Colt; I simply added the Best Of feature and
+2 rule. */


const p1 = {
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display'),
    setTracker: 0,
    trackerDisplay: document.querySelector('#p1WTracker'),
    number: 1
}
const p2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display'),
    setTracker: 0,
    trackerDisplay: document.querySelector('#p2WTracker'),
    number: 2
}

const resetButton = document.querySelector('#reset');
const nextButton = document.querySelector('#nextSet');
const winner = document.querySelector('#winner');
const winningScoreSelect = document.querySelector('#playto');
const bestOfSelect = document.querySelector('#bestOf');
let bestOf = 1;
let winningScore = 3;
let isSetOver = false;
let isGameOver = false;

nextButton.disabled = true;

function updateScores(player, opponent) {
    if (!hasWinner(bestOf)) {
        if (!isSetOver) {
            player.score += 1;
            if (player.score >= winningScore && player.score - opponent.score >= 2) {
                isSetOver = true;
                player.display.classList.add('has-text-success');
                opponent.display.classList.add('has-text-danger');
                player.button.disabled = true;
                opponent.button.disabled = true;
                nextButton.disabled = false;
                player.setTracker += 1;
                player.trackerDisplay.textContent = player.setTracker;

                if (hasWinner(bestOf)) {
                    winner.textContent = `Player ${player.number} is the winner!`
                    nextButton.disabled = true;
                }

            }
            player.display.textContent = player.score;
        }

    }
}


p1.button.addEventListener('click', function () {
    updateScores(p1, p2)
})
p2.button.addEventListener('click', function () {
    updateScores(p2, p1)
})


winningScoreSelect.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    reset();
})

bestOfSelect.addEventListener('change', function () {
    bestOf = parseInt(this.value);
    reset();
})

resetButton.addEventListener('click', reset)

nextButton.addEventListener('click', nextSet)

function reset() {
    isSetOver = false;
    isGameOver = false;

    winner.textContent = '';

    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.setTracker = 0;
        p.trackerDisplay.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
}

function nextSet() {
    isSetOver = false;
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
        nextButton.disabled = true;
    }
}

function hasWinner(games) {
    if (games === 1) {
        if (p1.setTracker === 1 || p2.setTracker === 1) {
            return true
        }
    }
    if (games === 3) {
        if (p1.setTracker === 2 || p2.setTracker === 2) {
            return true
        }
    }
    if (games === 5) {
        if (p1.setTracker === 3 || p2.setTracker === 13) {
            return true
        }
    }

    if (games === 7) {
        if (p1.setTracker === 4 || p2.setTracker === 4) {
            return true
        }
    }

    return false
}