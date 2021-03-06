// housekeeping - create global varibles
//
// Modal elements
const modal = document.querySelector('.my-modal'),
  modalClose = document.querySelector('.modal-close'),
  modalText = document.querySelector('.modal-text'),
  modalStars = document.querySelector('.modal-stars');

let numMatchedSets = 0,
  numOfMoves = 0,
  moveText = '',
  firstClick = true;

// game board elements
const board = document.querySelector('.board'),
  numMoves = document.querySelector('.num-moves'),
  timeClock = document.querySelector('.time-clock'),
  scoreBoard = document.querySelector('.score-board'),
  starsEarned = document.querySelector('.stars-earned');

let trySelection = 1,
  trySelected1 = '',
  trySelected2 = '';

const acc = document.getElementsByClassName('accordion');

//timer variables
let saveDate = '',
  startTime = '',
  endTime = '',
  intervalId = '',
  totalTime = 0,
  starsRemaining = 5,
  timesCheck = 0;

//Build timer and display on page; save starting time to calculate length
//
// credit for timer process: https://stackoverflow.com/questions/551759
//
function startClock() {
  saveDate =  new Date();
  startTime = saveDate.getTime();
  let sec = 0;

  function pad ( val ) {
     return val > 9 ? val : '0' + val;
  }
  intervalId = setInterval( function(){
      document.querySelector('.seconds').innerHTML=pad(++sec%60);
      document.querySelector('.minutes').innerHTML=pad(parseInt(sec/60,10));
  }, 1000);
}

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
  }

  return array;
}

// use random array to select images to place on board at random "td's"
function fillGameBoard() {
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
  }
  trySelection = 1;
  numOfMoves = 0;
  moveText = 'No. of moves: ' + numOfMoves;
  numMoves.textContent = moveText;
  document.querySelector('.seconds').innerHTML = '00';
  document.querySelector('.minutes').innerHTML = '00';
}


// Modal processes
//
// Open the modal
openModal = function(text) {
  modalText.textContent = text;
  modal.style.display = 'block';
  if (numMatchedSets < 8) {
    document.querySelector('#btnReset').style.display = 'none';
  } else {
    document.querySelector('#btnReset').style.display = 'inline-flex';
  }
};

// When the user clicks on <span> (x), close the modal
modalClose.onclick = function() {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function() {
  if (event.target == modal) {
      modal.style.display = 'none';
  }
};

// Check to see if 8 matches have been found - completes game!
function foundMatch() {
  numMatchedSets = numMatchedSets + 1;
  if (numMatchedSets >= 8) {
    // stop clock
    clearInterval(intervalId);
    saveDate =  new Date();
    endTime = saveDate.getTime();
    // get total time
    totalTime = endTime - startTime;
    let textWinner = document.querySelector('.modal-winner');
    textWinner.textContent = " -- Click Reset Button to play again!";
    modalClose.textContent = scoreBoard.textContent;
    while (starsEarned.childNodes.length > 0) {
      modalStars.appendChild(starsEarned.childNodes[0]);
    }
    openModal('CONGRATULATIONS - We Have a WINNER!');
  }
}

// Check the number of moves and timer to determine if take away a star
function determineStars() {
  // Determine number of stars to removeChild
  // if only one star remains, leave on board and no more checking
  if (starsRemaining > 1) {
    let starSelector = ".star" + starsRemaining;
    switch (numOfMoves) {
      case 12:
        document.querySelector(starSelector).style.display = 'none';
        starsRemaining = starsRemaining - 1;
        // flash num of moves to indicate reduced star
        setTimeout(function(){
          numMoves.style.fontWeight = 'bold';
          numMoves.style.color = 'red';
          setTimeout(function(){
            numMoves.style.fontWeight = 'normal';
            numMoves.style.color = 'initial';
          }, 250);
        }, 250);
        break;
      case 16:
        document.querySelector(starSelector).style.display = 'none';
        starsRemaining = starsRemaining - 1;
        // flash num of moves to indicate reduced star
        setTimeout(function(){
          numMoves.style.fontWeight = 'bold';
          numMoves.style.color = 'red';
          setTimeout(function(){
            numMoves.style.fontWeight = 'normal';
            numMoves.style.color = 'initial';
          }, 250);
        }, 250);
        break;
      case 20:
        document.querySelector(starSelector).style.display = 'none';
        starsRemaining = starsRemaining - 1;
        // flash num of moves to indicate reduced star
        setTimeout(function(){
          numMoves.style.fontWeight = 'bold';
          numMoves.style.color = 'red';
          setTimeout(function(){
            numMoves.style.fontWeight = 'normal';
            numMoves.style.color = 'initial';
          }, 250);
        }, 250);
        break;
      default:
        break;
    }
    // Remove stars based on number of moves
    //timesCheck will store each time the counter is executed so only each section is executed once.  TODO: opportunity to improve
    saveDate =  new Date();
    endTime = saveDate.getTime();
    // get total time
    totalTime = (endTime - startTime) / 1000;
    if (totalTime > 60 && timesCheck === 0) {
      document.querySelector(starSelector).style.display = 'none';
      starsRemaining = starsRemaining - 1;
      timesCheck++;
      // flash num of moves to indicate reduced star
      setTimeout(function(){
        timeClock.style.fontWeight = 'bold';
        timeClock.style.color = 'red';
        setTimeout(function(){
          timeClock.style.fontWeight = 'normal';
          timeClock.style.color = 'initial';
        }, 250);
      }, 250);
    }
    if (totalTime > 120 && timesCheck === 1) {
      document.querySelector(starSelector).style.display = 'none';
      starsRemaining = starsRemaining - 1;
      timesCheck++;
      // flash num of moves to indicate reduced star
      setTimeout(function(){
        timeClock.style.fontWeight = 'bold';
        timeClock.style.color = 'red';
        setTimeout(function(){
          timeClock.style.fontWeight = 'normal';
          timeClock.style.color = 'initial';
        }, 250);
      }, 250);
    }
    if (totalTime > 180 && timesCheck === 2) {
      document.querySelector(starSelector).style.display = 'none';
      starsRemaining = starsRemaining - 1;
      timesCheck++;
      // flash num of moves to indicate reduced star
      setTimeout(function(){
        timeClock.style.fontWeight = 'bold';
        timeClock.style.color = 'red';
        setTimeout(function(){
          timeClock.style.fontWeight = 'normal';
          timeClock.style.color = 'initial';
        }, 250);
      }, 250);
    }
  }
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
  // start the game clock on first click
  if (firstClick) {
    firstClick = false;
    startClock();
  }

  // check is disabled is on to stop cliking suring animation
  if (!board.classList.contains('disabled')) {
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

          // if square was visible and selected again - skip check for a match
          if (trySelected1.isEqualNode(trySelected2)) {
            foundMatch();
            trySelected1.classList.add('imgFadeIn');
            trySelected2.classList.add('imgFadeIn');
          } else {
            disable();
            setTimeout(function(){
              trySelected1.classList.remove('imgFadeIn');
              trySelected2.classList.remove('imgFadeIn');
              trySelected1.classList.add('imgFadeOut');
              trySelected2.classList.add('imgFadeOut');
              enable();
            },750);
          } // end check if two squares match or not

          numOfMoves = numOfMoves + 1;
          let moveText = 'No. of moves: ' + numOfMoves;
          let el = document.querySelector('.num-moves');
          el.textContent = moveText;
          determineStars();
        }  // end second square selected
      }   // end checking both cards
    }    // end check for if an IMG was selected
  }  // end check for disabled
});

//
// add 'disable' class to board to stop allowing clicks while animation happens
//
function disable() {
  board.classList.add('disabled');
}

//
// remove 'disable' class to board to allow allowing clicks after animation happens
//
function enable() {
  board.classList.remove('disabled');
}

//
// reset the board to start a new game
//

btnReset.addEventListener('click', function () {
  location.reload(true);
});

gameReset.addEventListener('click', function () {
  location.reload(true);
});

//accordion operation for introduction and  rules
//
// credit for accordion process: https://www.w3schools.com/howto/howto_js_accordion.asp
//
for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function() {
    this.classList.toggle('active');
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
}

// Reset number of matched numMatchedSets
numMatchedSets = 0;
// Random shuffle the td's number
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9 ,10, 11, 12, 13, 14, 15, 16];
arr = shuffle(arr);

//fill the Game Board with images
fillGameBoard();
