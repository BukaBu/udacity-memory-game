/*
 * Create a list that holds all of your cards
 */

cardsIcon = [{
    imgNumber: 1,
    img: "img/chick.svg",
    imgName: "chick"
  },
  {
    imgNumber: 1,
    img: "img/chick.svg",
    imgName: "chick"
  },
  {
    imgNumber: 2,
    img: "img/whale.svg",
    imgName: "whale"
  },
  {
    imgNumber: 2,
    img: "img/whale.svg",
    imgName: "whale"
  },
  {
    imgNumber: 3,
    img: "img/fox.svg",
    imgName: "fox"
  },
  {
    imgNumber: 3,
    img: "img/fox.svg",
    imgName: "fox"
  },
  {
    imgNumber: 4,
    img: "img/pig.svg",
    imgName: "pig"
  },
  {
    imgNumber: 4,
    img: "img/pig.svg",
    imgName: "pig"
  },
  {
    imgNumber: 5,
    img: "img/koala.svg",
    imgName: "koala"
  },
  {
    imgNumber: 5,
    img: "img/koala.svg",
    imgName: "koala"
  },
  {
    imgNumber: 6,
    img: "img/hedgehog.svg",
    imgName: "hedgehog"
  },
  {
    imgNumber: 6,
    img: "img/hedgehog.svg",
    imgName: "hedgehog"
  },
  {
    imgNumber: 7,
    img: "img/lemur.svg",
    imgName: "lemur"
  },
  {
    imgNumber: 7,
    img: "img/lemur.svg",
    imgName: "lemur"
  },
  {
    imgNumber: 8,
    img: "img/crab.svg",
    imgName: "crab"
  },
  {
    imgNumber: 8,
    img: "img/crab.svg",
    imgName: "crab"
  }
]

const card = document.querySelectorAll(".card");
const cards = Array.from(document.querySelectorAll(".card"));
const button = document.querySelector(".restart");

// array for opened cards
let openedCards = [];
let showedCard; //single opened card

let moves = 0;
const counter = document.querySelector(".moves");
const stars = document.querySelectorAll(".fa-star");

const matchedCard = document.getElementsByClassName("match");

const starsList = document.querySelectorAll(".stars li");

const restartButton = document.querySelector(".restart");


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function moveCounter() {
  moves++;
  counter.innerHTML = moves;
  //start timer on first click
  if (moves == 1) {
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }
}

// game timer
let second = 0,
    minute = 0,
    hour = 0;
const timer = document.querySelector(".timer");
let interval;

function startTimer() {
  interval = setInterval(function() {
    timer.innerHTML = minute + "mins " + second + "secs";
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}

function rating() {
  if (moves > 11 && moves < 16) {
    for (i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = "collapse";
      }
    }
  } else if (moves > 17) {
    for (i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.visibility = "collapse";
      }
    }
  }
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


window.onload = welcomeModal();

restartButton.addEventListener("click", startGame);

// Shuffle cards and assign them
function startGame() {

  openedCards = [];
  cardsIcon = shuffle(cardsIcon);

  for (let i = 0; i < cards.length; i++) {
    cards[i].children.item(0).setAttribute("src", cardsIcon[i].img);
    cards[i].children.item(0).setAttribute("value", cardsIcon[i].imgNumber);
    cards[i].children.item(0).setAttribute("alt", "photo of "+cardsIcon[i].imgName);
    cards[i].classList.remove("show", "open", "match", "disabled");
  }

  moves = 0;
  counter.innerHTML = moves;
  // reset rating
  for (let i = 0; i < stars.length; i++) {
    stars[i].style.visibility = "visible";
  }

  //reset timer
  second = 0;
  minute = 0;
  hour = 0;
  const timer = document.querySelector(".timer");
  timer.innerHTML = "0 mins 0 secs";
  clearInterval(interval);

}

// * set up the event listener for a card. If a card is clicked:

for (let i = 0; i < cards.length; i++) {

  cards[i].addEventListener("click", showCard);

}

// *  - display the card's symbol (put this functionality in another function that you call from this one)


function showCard() {

  this.classList.add("open");
  this.classList.add("show");
  this.classList.add("disabled");
  showedCard = this;
  openedCard();

}

// *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)

// *  - if the list already has another card, check to see if the two cards match

function openedCard() {

  openedCards.push(showedCard);

  let cardNum = openedCards.length;

  if (cardNum === 2) {

    moveCounter();

    if (openedCards[0].innerHTML === openedCards[1].innerHTML) {

      matched();

    } else {

      unmatched();
      rating();

    }
  }
}

// if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
function matched() {

  openedCards[0].classList.add("match");
  openedCards[1].classList.add("match");
  openedCards = [];

  congratulations();

}


function unmatched() {

  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");

  setTimeout(disableCards, 100); //disable card to not click other before unmatched animation ends
  setTimeout(function() {

    openedCards[0].classList.remove("open", "show", "disabled", "unmatched");
    openedCards[1].classList.remove("open", "show", "disabled", "unmatched");

    openedCards = [];

  }, 1000);

  setTimeout(enableCards, 1000); //enable cards to continue game
}


function disableCards() {

  for (let i = 0; i < cards.length; i++) {
    if ((openedCards[0] !== cards[i]) || (openedCards[1] !== cards[i])) {
      cards[i].classList.add("disabled");
    }
  }
}

function enableCards() {

  for (let i = 0; i < cards.length; i++) {
    if ((openedCards[0] !== cards[i]) || (openedCards[1] !== cards[i])) {
      cards[i].classList.remove("disabled");
    }
  }
}

//if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)

function welcomeModal() {
  // Get the modal
  const welcomeModal = document.getElementById('welcome-modal');

  // Get the button that opens the modal
  const btn = document.getElementById("my-button");

  // Get the <span> element that closes the modal
  const welcomeSpan = document.getElementsByClassName("close1")[0];

  // When the user clicks the button start game
  btn.addEventListener("click", function() {
    welcomeModal.style.display = "none";
    startGame();
  });

  // When the user clicks on <span> (x), close the modal
  welcomeSpan.addEventListener("click", function() {
    welcomeModal.style.display = "none";
    startGame();
  });


  // When the user clicks anywhere outside of the modal, close it
  window.addEventListener("click", function(event) {
    if (event.target == welcomeModal) {
      welcomeModal.style.display = "none";
      startGame();
    }
  });

}

function congratulations() {

  const congratulationSpan = document.getElementsByClassName("close2")[0];
  const congratModal = document.getElementById("congratulations");
  const playAgainButton = document.getElementById("play-again");

  if (matchedCard.length === 16) {

    clearInterval(interval);
    finalTime = timer.innerHTML;

    congratModal.style.display = "block";

    // declare star rating variable
    let starRating = document.querySelector(".stars").innerHTML;

    //showing move, rating, time on modal
    document.getElementById("final-move").innerHTML = moves;
    document.getElementById("star-rating").innerHTML = starRating;
    document.getElementById("total-time").innerHTML = finalTime;

    congratulationSpan.addEventListener("click", function() {
      congratModal.style.display = "none";
      startGame();
    });


    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", function(event) {
      if (event.target == congratModal) {
        congratModal.style.display = "none";
        startGame();
      }
    });
  }
  // When play again button is clicked start the Game
  playAgainButton.addEventListener("click", function() {
    congratModal.style.display = "none";
    startGame();
  });
}
