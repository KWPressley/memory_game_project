// housekeeping - create global varibles
const board = document.querySelector('#board');
let trySelection = 1;
let trySelected1 = "";
let trySelected2 = "";

// create an array of ramdom generated numbers for placing images on the game board
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  };

  return array;
}

// use random array to select images to place on board at random "td's"
function fillGameBoard() {
  let iconNum = "";
  let elements = document.querySelectorAll('.cellBtn');
    // loop thru the td's to fill each one with an image
    for (let i = 0; i < elements.length; i++) {
      // if random number is > 8 reduce it by 8 so image 1 thru 8 will be selected 2 times each to make the matches
      let j = i;
      if (arr[j] > 8) {
        arr[j] = arr[j] - 8;
      }

      let x = document.createElement("IMG");
      x.setAttribute("src", "img/icon-" + arr[j] + ".png");
      x.setAttribute("alt", "Matching iconic pictures");
      elements[i].appendChild(x);
    };
}

//function to fade in the selected card
// checks to see if card is already selected (send alert)
// checks to see if first or second selection
// after the second selection - if not equal, fade our image and reset return
//    if selections match - leave images showing
// note:  trySelection is first or second selections
//        trySelected1 is the first square selected
//        trySelected2 is the second square selected

board.addEventListener('click', function (evt) {
  if (trySelection == 1) {
    trySelected1 = evt.target;
    if (trySelected1.classList.contains("imgFadeIn")) {
      alert("square has already been selected")
    } else {
      trySelected1.classList.remove("imgFadeOut");
      trySelected1.classList.add("imgFadeIn");
      trySelection = 2;
    };
  } else {
      trySelected2 = evt.target;
      if (trySelected2.classList.contains("imgFadeIn")) {
        alert("square has already been selected")
      } else {
        trySelected2.classList.remove("imgFadeOut");
        trySelected2.classList.add("imgFadeIn");
        trySelection = 1;
      };

      if (trySelected1.isEqualNode(trySelected2)) {
        trySelected1.classList.remove("imgFadeOut");
        trySelected2.classList.remove("imgFadeOut");
        trySelected1.classList.add("imgFadeIn");
        trySelected2.classList.add("imgFadeIn");
      } else {
        trySelected1.classList.remove("imgFadeIn");
        trySelected2.classList.remove("imgFadeIn");
        trySelected1.classList.add("imgFadeOut");
        trySelected2.classList.add("imgFadeOut");
      };
  };
});

// Random shuffle the td's number
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9 ,10, 11, 12, 13, 14, 15, 16];
arr = shuffle(arr);

//fill the Game Board with images
fillGameBoard();
