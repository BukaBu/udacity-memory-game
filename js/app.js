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

  function rating() {
      if (moves > 11 && moves < 16){
          for( i= 0; i < 3; i++){
              if(i > 1){
                  stars[i].style.visibility = "collapse";
              }
          }
      }
      else if (moves > 17){
          for( i= 0; i < 3; i++){
              if(i > 0){
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

     for (i = 0 ; i < cards.length; i++) {
         cards[i].children.item(0).setAttribute("src", cardsIcon[i].img);
         cards[i].children.item(0).setAttribute("value", cardsIcon[i].imgNumber);
         cards[i].classList.remove("show", "open", "match", "disabled");
       }

       moves = 0;
       counter.innerHTML = moves;
       // reset rating
       for (var i= 0; i < stars.length; i++){
           stars[i].style.visibility = "visible";
       }

       //reset timer
       second = 0;
       minute = 0;
       hour = 0;
       var timer = document.querySelector(".timer");
       timer.innerHTML = "0 mins 0 secs";
       clearInterval(interval);

   }

   // * set up the event listener for a card. If a card is clicked:

   for (var i = 0; i < cards.length; i++){

    cards[i].addEventListener("click", showCard);

   }
