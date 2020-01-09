$(document).ready(initializeApp);

function initializeApp(){
  displayRotateModal();
  createCardDivs()
$(".container").on("click",".card-div",handleCardClick);
$("#reset-button").click(resetGame);
$(window).resize(displayRotateModal);
}

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var maxMatches = 9;
var attempts = 0;
var gamesPlayed = 0;
var gameComplete = false;
var characterClass = ["kkslider","tomnook","isabelle","reese","cyrus","mabel","sable","resetti","blathers"];
var classArray = characterClass.concat(characterClass);

function displayRotateModal(){
  let modalCover = $('.modal-cover');
  let ratio = $(window).width() / $(window).height();
    if (ratio < 1.33|| ratio > 3.2) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $(".modal-text").text("Please rotate your device");
      } else{
        $(".modal-text").text("Please resize your screen to continue");
      }
      modalCover.removeClass("hidden").addClass("opaque-black");
      $("#reset-button").addClass("hidden");

    } else if(!gameComplete){
      modalCover.addClass("hidden").removeClass("opaque-black");
      $("#reset-button").removeClass("hidden");
      $(".modal-text").text("You Won!");
    } else{
      modalCover.removeClass("hidden").removeClass("opaque-black");
      $("#reset-button").removeClass("hidden");
      $(".modal-text").text("You Won!");

    }
}

function handleCardClick(event){
  var currentCard = $(event.currentTarget);
  $(currentCard).find(".card-back").addClass("invisible");
  currentCard.addClass("disable");
  if(!firstCardClicked){
    firstCardClicked = currentCard;
  }
  else if(!secondCardClicked){
    attempts++;
    secondCardClicked = currentCard;
    $(".card-div").addClass("disable");

    displayStats();
    var cardFront1 = firstCardClicked.find(".card-front").css("background-image");
    var cardFront2 = secondCardClicked.find(".card-front").css("background-image");

    if (cardFront1 === cardFront2){
      setTimeout(function(){
        firstCardClicked.addClass("invisible");
        secondCardClicked.addClass("invisible");
        $(".card-div").removeClass("disable");
        resetCards();
      },800)
      displayCharacter(cardFront1);
      matches++;
      displayStats();
      if(matches === maxMatches){
        displayStats();
        $('.card-div').removeClass('invisible').addClass('disable');
        gameComplete = true;
        $(".modal-cover").removeClass("hidden");
      }
    } else {
      setTimeout(function(){
      firstCardClicked.find(".card-back").removeClass("invisible");
      secondCardClicked.find(".card-back").removeClass("invisible");

      $(".card-div").removeClass("disable");

      resetCards();
    },800)
    }
  }
  }

function resetCards(){
  firstCardClicked = null;
  secondCardClicked = null;
}

function displayStats(){
  var accuracy = Math.trunc((matches/attempts)*100);
  if(!accuracy){
    accuracy = 0;
  }
  $(".games-played").text(gamesPlayed);
  $(".attempts").text(attempts);
  $(".accuracy").text(accuracy+"%");
}

function resetGame(){
  $(".modal-cover").addClass("hidden");
  classArray = characterClass.concat(characterClass);
  $("main").empty();
  $("main").append($("<div>",{class:"container"}));
  $(".container").on("click", ".card-div", handleCardClick);
  createCardDivs();
  gamesPlayed++;
  attempts = 0;
  matches = 0;
  gameComplete = false;
  displayStats();
}

function createCardDivs(){//Traverses a random card matrix, creates a new card div, and appends it to the container div
  var cardArray = createRandomCards();
  for(var i = 0; i<cardArray.length; i++){
    var newCardDiv = $("<div>",{class:"card-div"});
    newCardDiv.append(cardArray[i][0], cardArray[i][1]);
    $(".container").append(newCardDiv);
  }
}

function createRandomCards(){//Creates a matrix of cards with random character classes
  var card = [];
  var cardArray = [];
  var character = '';
  while(classArray.length){
    character = classArray.splice(Math.floor(Math.random()*(classArray.length)),1)
    card.push($("<div>",{class: "card-front "+character}));
    card.push($("<div>", { class: "card-back"}))
    cardArray.push(card);
    card = [];
  }
  return cardArray;
}

function displayCharacter(character){
  var baseLeft = 55,
      baseTop = 42,
      newLeft = baseLeft + 14*matches;
  var characterImg = character.slice(character.lastIndexOf("/")+1, character.lastIndexOf(".png"))+"match.png";
  var imgPath = "assets/images/" + characterImg;
  var newImg = $("<img>",{src:imgPath, css:{top:baseTop+"vmin",left:newLeft+"vmin"}});
  $("main").append(newImg);
}
