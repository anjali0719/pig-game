const scorePlayer1Element = document.querySelector('#score--0');
const scorePlayer2Element = document.querySelector('#score--1'); // or document.getElementById('score--1')
const currentPlayer0 = document.querySelector('.player--0');
const currentPlayer1 = document.querySelector('.player--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
// hide the dice initially
const diceElement = document.querySelector('.dice');

let scores, currentScoreValue, activePlayer, playing;

const initialValues = () => {
    scores = [0, 0];
    currentScoreValue = 0;
    activePlayer = 0;
    playing = true; // if this is false, means we're not playing
    activePlayer = 0;

    // set the initial values to 0
    scorePlayer1Element.textContent = 0;
    scorePlayer2Element.textContent = 0;

    current0.textContent = 0;
    current1.textContent = 0;
    diceElement.classList.add('hidden');
    currentPlayer0.classList.remove('player--winner');
    currentPlayer0.classList.add('player--active');
    currentPlayer1.classList.remove('player--winner');
    currentPlayer1.classList.remove('player--active');
};
initialValues();

// roll the dice
const btnNew =  document.querySelector('.btn--new');
const btnRoll =  document.querySelector('.btn--roll');
const btnHold =  document.querySelector('.btn--hold');

const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScoreValue = 0;
    currentPlayer0.classList.toggle('player--active');
    currentPlayer1.classList.toggle('player--active');
};


const diceRoll = () => {
    if (playing) {
        // generate random number on dice till 6
        const randomDiceNumber = Math.floor(Math.random() * 6) + 1;
        console.log("randomDiceNumber --->",randomDiceNumber);
        
        // once the btn has been clicked, the dice shouldn't be hidden anymore
        diceElement.classList.remove('hidden');

        // display dice acc to the random generated number
        diceElement.src = `dice-${randomDiceNumber}.png`;

        // check if dice rolled is 1, switch player else add the dice rolled to current score
        if (randomDiceNumber !== 1){
            currentScoreValue += randomDiceNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScoreValue;
        } else {
            switchPlayer();
        }
    };
};

btnRoll.addEventListener('click', diceRoll);


const holdScoreBtn = () => {
    if (playing) {
        scores[activePlayer] += currentScoreValue;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 20){
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceElement.classList.add('hidden');
        } else{
            switchPlayer(); 
        }
    };
};
btnHold.addEventListener('click', holdScoreBtn);

btnNew.addEventListener('click', initialValues);