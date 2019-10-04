$(document).ready(initializeApp);

function initializeApp(){

$(".container").on("click",".card_div",handleCardClick);

}

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var maxMatches = 2;
var attempts = 0;
var games_played = 0;


function handleCardClick(event){
  var currentCard = $(event.currentTarget);
  $(currentCard).find(".card_back").toggleClass("invisible");
  if(!firstCardClicked){
    firstCardClicked = currentCard;
  }
  else if(!secondCardClicked){
    attempts++;
    secondCardClicked = currentCard;
    var cardFront1 = firstCardClicked.find(".card_front").css("background-image");
    var cardFront2 = secondCardClicked.find(".card_front").css("background-image");
    displayStats();

    if (cardFront1 === cardFront2){
      console.log("It's a match!");
      matches++;
      displayStats();
      setTimeout(function(){
        firstCardClicked.toggleClass("invisible");
        secondCardClicked.toggleClass("invisible");
        resetCards();
      },1000)
      if(matches === maxMatches){
        games_played++;
        displayStats();
        console.log("You won!");
        $(".modal_cover").toggleClass("hidden");
      }
    } else {
      console.log("Try again!");
      setTimeout(function(){
      firstCardClicked.find(".card_back").toggleClass("invisible");
      secondCardClicked.find(".card_back").toggleClass("invisible");
      resetCards();
    },1500)
    }
  }
  }



function resetCards(){
  firstCardClicked = null;
  secondCardClicked = null;
}

function displayStats(){
  var accuracy = Math.trunc((matches/attempts)*100);
  $(".games_played").text(games_played);
  $(".attempts").text(attempts);
  $(".accuracy").text(accuracy+"%");
}
