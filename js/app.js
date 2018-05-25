// housekeeping - create global varibles
//
// Modal elements
const modal = document.querySelector('.my-modal');
const modalClose = document.querySelector('.modal-close');
const modalText = document.querySelector('.modal-text');
let numMatchedSets = 0;
let numOfMoves = 0;
let moveText = ';'
let firstClick = true;

// game board elements
const board = document.querySelector('.board');
const numMoves = document.querySelector('.num-moves');
let trySelection = 1;
let trySelected1 = '';
let trySelected2 = '';
const acc = document.getElementsByClassName('accordion');

//timer variables
let saveDate = '';
let startTime = '';
let endTime = '';
let intervalId = '';
let totalTime = 0;

//Build timer and display on page; save starting time to calculate length
//
// credit for timer process: https://stackoverflow.com/questions/551759
//
function startClock() {
  saveDate =  new Date();
  startTime = saveDate.getTime();
  sec = 0;

  function pad ( val ) {
     return val > 9 ? val : '0' + val;
  }
  intervalId = setInterval( function(){
      document.querySelector('.seconds').innerHTML=pad(++sec%60);
      document.querySelector('.minutes').innerHTML=pad(parseInt(sec/60,10));
  }, 1000);
};

// create an array of ramdom generated numbers for placing images on the game board
//  credit to: https://stackoverflow.com/questions/2450954
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
  let iconNum = '';
  let elements = document.querySelectorAll('.cell-btn');
    // loop thru the td's to fill each one with an image
    for (let i = 0; i < elements.length; i++) {
      // if random number is > 8 reduce it by 8 so image 1 thru 8 will be selected 2 times each to make the matches
      let j = i;
      if (arr[j] > 8) {
        arr[j] = arr[j] - 8;
      }

      let x = document.createElement('IMG');
      x.setAttribute('src', 'img/icon-' + arr[j] + '.png');
      x.setAttribute('alt', 'Matching iconic pictures');
      x.setAttribute('class', 'icon-image');
      elements[i].appendChild(x);
    };
  trySelection = 1;
  numOfMoves = 0;
  moveText = 'No. of moves: ' + numOfMoves;
  numMoves.textContent = moveText;
}


// Modal processes
//
// Open the modal
openModal = function(text) {
  modalText.textContent = text;
  modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
modalClose.onclick = function() {
  modal.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function() {
  if (event.target == modal) {
      modal.style.display = 'none';
  };
}

// Check to see if 8 matches have been found - completes game!
foundMatch = function() {
  numMatchedSets = numMatchedSets + 1;
  if (numMatchedSets >= 8) {
    // stop clock
    clearInterval(intervalId);
    saveDate =  new Date();
    endTime = saveDate.getTime();
    // get total time
    totalTime = endTime - startTime;
    console.log(totalTime);

    // Determine number of stars to award
    let stars = 0;
      if (numOfMoves < 12) {stars = 3} else
      if (numOfMoves < 16) {stars = 2} else
      if (numOfMoves < 20) {stars = 1} else
      stars = 0;
      if (totalTime/1000 < 30) {stars = stars + 3} else
      if (totalTime/1000 < 50) {stars = stars + 2} else
      if (totalTime/1000 < 70) {stars = stars + 1};
      // add stars to display
      let textWinner = document.querySelector('.modal-winner');
      textWinner.textContent = " -- Click Reset Button to play again!";
      openModal('CONGRATULATIONS - We Have a WINNER!');

      let elements = document.querySelectorAll('.stars');
      // loop thru the stars to turn on all earned
      for (let i = 0; i < elements.length; i++) {
        if (stars > i) {
          elements[i].style.visibility = 'visible';
        };
      };
  };
}

//function to fade in the selected card
// checks to see if card is already selected (modal error)
// checks to see if first or second selection
// after the second selection - if not equal, fade our image and reset return
//    if selections match - leave images showing
// note:  trySelection is first or second selections
//        trySelected1 is the first square selected
//        trySelected2 is the second square selected

board.addEventListener('click', function (evt) {
  if (firstClick) {
    firstClick = false;
    startClock();
  };
  // only run check when an IMG is clicked
  if (evt.target.tagName === 'IMG') {
    if (evt.target.classList.contains('imgFadeIn')) {
      openModal('Square has already been selected');
    } else {
    if (trySelection == 1) {
        trySelected1 = evt.target;
        trySelected1.classList.add('imgFadeIn');
        trySelected1.classList.remove('imgFadeOut');
        trySelection = 2;
      } else {
        trySelected2 = evt.target;
        trySelected2.classList.add('imgFadeIn');
        trySelected2.classList.remove('imgFadeOut');
        trySelection = 1;


        //add a 1 second delay to allow player to see selection before removing
        setTimeout(function() {
          // if square was visible and selected again - skip check for a match
          if (trySelected1.isEqualNode(trySelected2)) {
            foundMatch();
            trySelected1.classList.add('imgFadeIn');
            trySelected2.classList.add('imgFadeIn');
          } else {
            trySelected1.classList.remove('imgFadeIn');
            trySelected2.classList.remove('imgFadeIn');
            trySelected1.classList.add('imgFadeOut');
            trySelected2.classList.add('imgFadeOut');
          }; // end check if two squares match or not
        }, 1000);
        numOfMoves = numOfMoves + 1;
        let moveText = 'No. of moves: ' + numOfMoves;
        let el = document.querySelector('.num-moves');
        el.textContent = moveText;
      };  // end second square selected
    };
  };  // end check for if an IMG was selected
});

//
// reset the board to start a new game
//

btnReset.addEventListener('click', function () {
  // Find all the "img" elements
  let elements = document.querySelectorAll('.icon-image');
  // loop thru the td's to all the current images
  for (let i = 0; i < elements.length; i++) {
    let child = elements[i];
    child.parentNode.removeChild(child);
  };
  // Reset interval start switch (expression)
  firstClick = true;
  // Reset number of matched numMatchedSet
  numMatchedSets = 0;
  // Reset game time clock
  clearInterval(intervalId);
  document.querySelector('.seconds').innerHTML = '00';
  document.querySelector('.minutes').innerHTML = '00';
  // Random shuffle the td's number
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9 ,10, 11, 12, 13, 14, 15, 16];
  arr = shuffle(arr);
  fillGameBoard();
});

//accordion operation for introduction and  rules
//
// credit for timer process: https://www.w3schools.com/howto/howto_js_accordion.asp
//
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function() {
    this.classList.toggle('active');
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
};

// Reset number of matched numMatchedSets
numMatchedSets = 0;
// Random shuffle the td's number
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9 ,10, 11, 12, 13, 14, 15, 16];
arr = shuffle(arr);

//fill the Game Board with images
fillGameBoard();
