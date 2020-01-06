$(document).ready(initializeApp);

function initializeApp(){
  createCardDivs()
$(".container").on("click",".card-div",handleCardClick);
$(".reset").click(resetGame);
$(window).resize(()=>console.log("window resize"));
}

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var maxMatches = 9;
var attempts = 0;
var gamesPlayed = 0;
var characterClass = ["kkslider","tomnook","isabelle","reese","cyrus","mabel","sable","resetti","blathers"];
var classArray = characterClass.concat(characterClass);

function handleCardClick(event){
  var currentCard = $(event.currentTarget);
  $(currentCard).find(".card-back").toggleClass("invisible");
  currentCard.toggleClass("disable");
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
        firstCardClicked.toggleClass("invisible");
        secondCardClicked.toggleClass("invisible");
        $(".card-div").removeClass("disable");
        resetCards();
      },800)
      displayCharacter(cardFront1);
      matches++;
      displayStats();
      if(matches === maxMatches){
        displayStats();
        console.log("You won!");
        $(".modal-cover").toggleClass("hidden");
      }
    } else {
      setTimeout(function(){
      firstCardClicked.find(".card-back").toggleClass("invisible");
      secondCardClicked.find(".card-back").toggleClass("invisible");

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
  $(".modal_cover").toggleClass("hidden");
  classArray = characterClass.concat(characterClass);
  $("main").empty();
  $("main").append($("<div>",{class:"container"}));
  $(".container").on("click", ".card-div", handleCardClick);
  createCardDivs();
  gamesPlayed++;
  attempts = 0;
  matches = 0;
  displayStats();
}

function createCardDivs(){//Traverses a random card matrix, creates a new card div, and appends it to the container div
  var card_array = createRandomCards();
  for(var i = 0; i<card_array.length; i++){
    var newCardDiv = $("<div>",{class:"card-div"});
    newCardDiv.append(card_array[i][0], card_array[i][1]);
    $(".container").append(newCardDiv);
  }
}

function createRandomCards(){//Creates a matrix of cards with random character classes
  var card = [];
  var card_array = [];
  var character = '';
  while(classArray.length){
    character = classArray.splice(Math.floor(Math.random()*(classArray.length)),1)
    card.push($("<div>",{class: "card-front "+character}));
    card.push($("<div>", { class: "card-back"}))
    card_array.push(card);
    card = [];
  }
  return card_array;
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
