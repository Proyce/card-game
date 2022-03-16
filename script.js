'use strict';

// references
const scoreRef0 = document.querySelector('#score--0');
const scoreRef1 = document.querySelector('#score--1');
const currentScoreRef0 = document.querySelector('#current--0');
const currentScoreRef1 = document.querySelector('#current--1');
const diceRef = document.querySelector('.dice');
const newGameBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const player0Ref = document.querySelector('.player--0');
const player1Ref = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;
const init = function () {
  // references init
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scoreRef0.textContent = 0;
  scoreRef1.textContent = 0;
  currentScoreRef0.textContent = 0;
  currentScoreRef1.textContent = 0;
  diceRef.classList.add('hidden');
  player0Ref.classList.remove('player--winner');
  player1Ref.classList.remove('player--winner');
  player0Ref.classList.add('player--active');
  player1Ref.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Ref.classList.toggle('player--active');
  player1Ref.classList.toggle('player--active');
};

// roll dice
rollBtn.addEventListener('click', function () {
  if (playing) {
    const diceNum = Math.ceil(Math.random() * 6);
    // show dice
    diceRef.classList.remove('hidden');
    diceRef.src = `dice-${diceNum}.png`;

    if (diceNum !== 1) {
      currentScore += diceNum;
      // currentScoreRef0.textContent = currentScore;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;
      diceRef.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

newGameBtn.addEventListener('click', init);
