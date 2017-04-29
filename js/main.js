var gameBoard = [
  "   |   |   ",
  "---+---+---",
  "   |   |   ",
  "---+---+---",
  "   |   |   "
];
var xStart = 1;
var xSkip = 4;
var yStart = 0;
var ySkip = 2;

var userChar = 'X';
var aiChar = 'O';
var turnNum = 1;

function drawBoard() {
  var text = "";
  for (y = 0; y < gameBoard.length; y++) {
    for (x = 0; x < gameBoard[0].length; x++) {
      if (gameBoard[y][x] === ' ') {
        text += '&nbsp;'
      } else {
        text += gameBoard[y][x];
      }
    }
    text += '<br>';
  }
  $('#game').html(text);
}

function getX(rawX) {
  var width = numFromPixels($('#game').css('width'));
  var offset_left = numFromPixels($('body').css('margin-left'));
  var x = Math.floor(gameBoard[0].length * (rawX - offset_left) / width);
  console.log(x);
  if ((x % xSkip) === (xSkip - 1)) {
    return false;
  }
  return Math.floor(x / xSkip);
}

function getY(rawY) {
  var height =  numFromPixels($('#game').css('height'));
  var offset_top = sumNumFromPixels([
    $('body').css('margin-top'),
    $('h1').css('height'),
    $('h1').css('margin-top'),
    $('h1').css('margin-bottom'),
  ]);
  var y = Math.floor(gameBoard.length * (rawY - offset_top) / height);
  console.log(y);
  if ((y % ySkip) === (ySkip - 1)) {
    return false;
  }
  return Math.floor(y  / ySkip);
}

function numFromPixels(string) {
  return Number(string.substring(0,string.indexOf('px')));
}

function sumNumFromPixels(strings) {
  sum = 0;
  for (i = 0; i < strings.length; i++) {
    sum += numFromPixels(strings[i]);
  }
  return sum;
}

function addChar(char, x, y) {
  // console.log(char + x + y);
  x = xStart + (x * xSkip);
  y = yStart + (y * ySkip);
  var line = gameBoard[y];
  console.log(line)
  line = line.substring(0, x) + char + line.substring(x + 1, line.length);
  gameBoard[y] = line;
  drawBoard();
}

function charAt(x, y) {
  return gamdBoard[yStart + (y * ySkip)][Start + (x * xSkip)];
}

function ai() {
  if (charAt(1, 1) === ' ') {
    addChar(aiChar, 1, 1);
  } else {
    switch(turnNum) {}
  }
}

$(function() {
  $('body').css('max-width', $('#game').css('width'));
  setTimeout(drawBoard, 500);
  $('#game').on('click', function(e) {
    x = getX(e.clientX);
    y = getY(e.clientY);
    if (x && y) {
      addChar(userChar, x, y);
      turnNum++;
    }
  });
});
