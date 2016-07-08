var squares = document.querySelectorAll('.colorSquare');
var encouragementText = document.querySelector('.hidden');
var header = document.querySelector('#header');
var colorsContainer = document.querySelector('#colorSquareContainer');
var randRgbContainer = [];
var currentRgb = '';
var upperBound = 255;
var lowerBound = 0;
var boundsSpeedControl = 40;
function randomize() {
  randRgbContainer = [];
  for(i=0;i<squares.length;i++) {
    randRgbContainer.push(squares[i].style.background = "rgb("+(Math.floor(Math.random()*(upperBound-lowerBound))+lowerBound).toString()+', '+(Math.floor(Math.random()*(upperBound-lowerBound))+lowerBound).toString()+', '+(Math.floor(Math.random()*(upperBound - lowerBound))+lowerBound).toString()+")");
  };
  setRgb();
  document.querySelector('#newGame').textContent = "Random Colors";
  header.removeAttribute('style');
  header.classList.add("headerBackground");
  encouragementText.classList.add("hidden");
}
function setRgb() {
  var randRgbValue = randRgbContainer[Math.floor(Math.random()*randRgbContainer.length)];
  currentRgb = document.querySelector('#currentRgbDisplay').innerHTML = randRgbValue;
  newSquares();
}
function newSquares(thisRgb) {
  for(i = 0; i < squares.length; i++) {
    var thisSquare = squares[i];
    thisSquare.style.opacity = 1;
    thisSquare.style.background = thisRgb;
  }
}
// determine if thisRgb = currentRgb
function colorSquareSearch() {
  for(i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', function(){
      var thisRgb = this.style.background;
      if (thisRgb != currentRgb) {
        this.style.opacity = '.0'
        encouragementText.classList.remove("hidden");
      } else {
        squareFound(thisRgb);
      }
    })
  };
}
function squareFound(thisRgb) {
  encouragementText.classList.add("hidden")
  document.querySelector('#newGame').textContent = "Next Color";
  newSquares(thisRgb);
  header.classList.remove("headerBackground")
  header.style.background = thisRgb;
}
function difficulty(level) {
  if (level != 'easy' ) {
    document.querySelector('.navRightL').classList.remove('active');
    document.querySelector('.navRightR').classList.add('active');
    if (squares.length != 12) {
      for (i = 0; i < 6; i++) {
        colorsContainer.appendChild(document.createElement("div")).className = "colorSquare";
      };
    }
    squares = document.querySelectorAll('.colorSquare');
    randomize();
    colorSquareSearch();
    for (i=0; i<squares.length;i++) {
      squares[i].classList.add('colorSquareHard');
    };
  } else {
    document.querySelector('.navRightL').classList.add('active');
    document.querySelector('.navRightR').classList.remove('active');
    for (i = squares.length-1; i >= 0; i--) {
      if (i > 5) {
        colorsContainer.removeChild(squares[i]);
      } else if (i <= 5) {
        squares[i].classList.remove('colorSquareHard');
      }
    };
    squares = document.querySelectorAll('.colorSquare');
    randomize();
    colorSquareSearch();
  }
}
var lowerBoundInterval;
var upperBoundInterval;
function clearLowerBound() {
  clearInterval(lowerBoundInterval);
}
function lowerBoundControl(dir) {
  lowerBoundInterval = setInterval(function(){
    if (dir === 'up' && lowerBound != upperBound) { lowerBound ++;} else { if (lowerBound != 0) {lowerBound --}};
    document.querySelector('.lowerBound').innerHTML = lowerBound;
  }, boundsSpeedControl)
}
function clearUpperBound() {
  clearInterval(upperBoundInterval);
}
function upperBoundControl(dir) {
  upperBoundInterval = setInterval(function(){
    if (dir != 'up' && upperBound != lowerBound) { upperBound --;} else { if (upperBound != 255) {upperBound ++}};
    document.querySelector('.upperBound').innerHTML = upperBound;
  }, boundsSpeedControl)
}
colorSquareSearch();
randomize();

































