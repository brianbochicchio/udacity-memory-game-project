/*
 * Game Setup
 */

let deckOfCards = ["fa-diamond",
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-bolt",
    "fa-cube",
    "fa-anchor",
    "fa-leaf",
    "fa-bicycle",
    "fa-diamond",
    "fa-bomb",
    "fa-leaf",
    "fa-bomb",
    "fa-bolt",
    "fa-bicycle",
    "fa-paper-plane-o",
    "fa-cube"]

// Constants to minimize magic numbers and make changing the game attributes easier
const winningCardCount = 4;
const cardHideDelay = 1000;
const numberOfStars = 3;

// Document references that are used frequently or needed for game duration
const moveCounter = document.querySelector('.moves');
const gameRestart = document.querySelector('.restart');
const deckEventHandler = document.querySelector('.deck');


//Globals for frequently referenced or updated variables
let moveCount;
let elapsedTime;
let gameClock;
let flippedCardCount;

// Container for selected cards
let selectedCards = [];

// True when the when the cards don't match and until they are flipped back over to prevent errant flips
let interceptClick = false;

// Game Board event listeners
gameRestart.addEventListener('click', resetBoard);

//Handles card clicks and initiates end game check
deckEventHandler.addEventListener('click', function (e) {
    if (e.target.className === "card" && !interceptClick) {
        flipCard(e.target)
        //Allows last card to draw before checking for win condition
        window.setTimeout(gameWon, 250);
    }
});


/*
 * Game State Functions
 */

function gameInit() {
    moveCount = 0;
    elapsedTime = 0;
    flippedCardCount = 0;
    moveCounter.innerText = moveCount;
    shuffle(deckOfCards);
    drawBoard(deckOfCards, numberOfStars);
};

function gameWon() {

    // still need to create win modal with game results and replay option
    if (flippedCardCount == winningCardCount) {
        //console.log("GAME WON");
        clockStop();

        let finalMovesLocation = document.querySelector('#finalMoves');
        finalMovesLocation.innerText = "Total Moves: " + moveCount;

        let timerLocation = document.querySelector('.timer');
        let finalTimeLocation = document.querySelector('#finalTime');
        finalTimeLocation.innerText = "Play Time: " + timerLocation.innerText;

        let starsLocation = document.querySelector(".stars");
        let finalRatingLocation = document.querySelector('#finalRating')
        finalRatingLocation.insertAdjacentHTML('beforeend', starsLocation.innerHTML);

        let playAgainButton = document.querySelector('#playAgain');
        playAgainButton.addEventListener('click', playAgain, true);

        modal.style.display = "block";
    }

};

/*
 * Start the Game *
 */

gameInit();


/*
 * Game Board Functions *
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function playAgain() {
    modal.style.display = "none";
    resetBoard();

}

function drawBoard(cards, stars) {

    let deckLocation = document.querySelector('.deck');

    for (card of cards) {
        deckLocation.insertAdjacentHTML("beforeend", "<li class=\"card\"><i class=\"fa " + card + "\"></i></li>");
    }

    let starsLocation = document.querySelector(".stars");
    for (let i = 0; i < stars; i++ ) {
        starsLocation.insertAdjacentHTML("beforeend", "<li><i class=\"fa fa-star\"></i></li>");
    }

}

function resetBoard() {

    selectedCards = [];

    let deckContainer = document.querySelector('.deck');
    while (deckContainer.firstChild) {
        deckContainer.removeChild(deckContainer.firstChild);
    }

    let starsLocation = document.querySelector(".stars");
    while (starsLocation.firstChild) {
        starsLocation.removeChild(starsLocation.firstChild);
    }

    clockStop();
    let timerLocation = document.querySelector('.timer');
    timerLocation.innerText = "-- : --";

    gameInit();

}

function updateMoves(){
    moveCount++;
    moveCounter.innerText = moveCount;


    switch (moveCount) {
        case 14:
            removeStar();
            break;
        case 20:
            removeStar();
            break;
        default:

    }

}


function removeStar() {

    let starsLocation = document.querySelector(".stars").firstElementChild;
    starsLocation.parentNode.removeChild(starsLocation);
    console.log("remove stars called");
}

/*
 * Clock Functions *
 */

function clockStart(){
    gameClock = setInterval(clockTick, 1000);

}

function clockStop(){
    clearInterval(gameClock);

}

function clockTick() {
    let timerLocation = document.querySelector('.timer');
    let minute = Math.floor(elapsedTime / 60);
    let seconds = Math.floor(elapsedTime - (minute * 60))  ;
    minute = minute.toString();
    seconds = seconds.toString();
    elapsedTime++;
    timerLocation.innerText = minute.padStart(2,'0')+ " : " + seconds.padStart(2,'0');

}


/*
 * Game Card Functions *
 */


function flipCard(card) {
    if (elapsedTime === 0){
        clockStart();
    }

    if (selectedCards.length < 2) {
        showCard(card);
    }

    if (selectedCards.length === 2) {

        if(isMatch(selectedCards)){
            showMatch(selectedCards);
            flippedCardCount += 2;

        } else {
            interceptClick = true;
            window.setTimeout(hideCards, cardHideDelay, selectedCards);
        }

        updateMoves();
        selectedCards = [];
    }


}

function showCard(card) {
    selectedCards.push(card);
    card.classList.add('open', 'show');
}


function isMatch(cards) {
    let card1 = cards[0].childNodes[0].classList[1];
    let card2 = cards[1].childNodes[0].classList[1];

    return (card1 == card2 ? true : false);

}

function showMatch(cards) {
    for (card of cards) {
        card.classList.remove('open', 'show');
        card.classList.add('match');
    }

}

function hideCards(cards) {
    for (card of cards) {
        card.classList.remove('open', 'show');
    }
    interceptClick = false;

}



