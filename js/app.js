// create an array of ramdom generated numbers for placing images on the game board
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

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
      // build url to random selected image
      iconNum = "url('img/icon-" + arr[j] + ".png')";
      elements[i].style.backgroundImage = iconNum;
    };
}


// Random shuffle the td's number
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9 ,10, 11, 12, 13, 14, 15, 16];
arr = shuffle(arr);

//fill the Game Board with images
fillGameBoard();
