$(document).ready(initializeApp);

function initializeApp(){

$(".card_div").on("click",".card_back",handleCardClick);

}


function handleCardClick(event){
  $(event.currentTarget).toggleClass("hidden");
}
