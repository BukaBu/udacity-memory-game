/*
 * Create a list that holds all of your cards
 */

 cardsIcon =
  [
      {
          imgNumber: 1,
          img:"img/chick.svg"
      },
      {
          imgNumber: 1,
          img:"img/chick.svg"
      },
      {
          imgNumber: 2,
          img:"img/whale.svg"
      },
      {
          imgNumber: 2,
          img:"img/whale.svg"
      },
      {
          imgNumber: 3,
          img:"img/fox.svg"
      },
      {
          imgNumber: 3,
          img:"img/fox.svg"
      },
      {
          imgNumber: 4,
          img:"img/pig.svg"
      },
      {
          imgNumber: 4,
          img:"img/pig.svg"
      },
      {
          imgNumber: 5,
          img:"img/koala.svg"
      },
      {
          imgNumber: 5,
          img:"img/koala.svg"
      },
      {
          imgNumber: 6,
          img:"img/hedgehog.svg"
      },
      {
          imgNumber: 6,
          img:"img/hedgehog.svg"
      },
      {
          imgNumber: 7,
          img:"img/lemur.svg"
      },
      {
          imgNumber: 7,
          img:"img/lemur.svg"
      },
      {
          imgNumber: 8,
          img:"img/crab.svg"
      },
      {
          imgNumber: 8,
          img:"img/crab.svg"
      }
  ]

  let card = document.querySelectorAll(".card");
  const cards = Array.from(document.querySelectorAll(".card"));
  const button = document.querySelector(".restart");
  // array for opened cards
  let openedCards = [];
  let showedCard; //single opened card

  let moves = 0;
  let counter = document.querySelector(".moves");
  const stars = document.querySelectorAll(".fa-star");

  let matchedCard = document.getElementsByClassName("match");

  let starsList = document.querySelectorAll(".stars li");

  const restartButton = document.querySelector(".restart");
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
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

function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if(moves == 1){
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
  }

  // game timer
  let second = 0, minute = 0; hour = 0;
  const timer = document.querySelector(".timer");
  let interval;
  function startTimer(){
      interval = setInterval(function(){
          timer.innerHTML = minute+"mins "+second+"secs";
          second++;
          if(second == 60){
              minute++;
              second=0;
          }
          if(minute == 60){
              hour++;
              minute = 0;
          }
      },1000);
  }

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
