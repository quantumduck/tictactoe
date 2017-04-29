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
var turnNum = 0;

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
    return -1;
  }
  console.log(Math.floor(x  / xSkip));
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
    return -1;
  }
  console.log(Math.floor(y  / ySkip));
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
  if (charAt(x, y) != ' ') {
    return charAt(x, y);
  }
  x = xStart + (x * xSkip);
  y = yStart + (y * ySkip);
  var line = gameBoard[y];
  line = line.substring(0, x) + char + line.substring(x + 1, line.length);
  gameBoard[y] = line;
  drawBoard();
  return char;
}

function charAt(x, y) {
  return gameBoard[yStart + (y * ySkip)][xStart + (x * xSkip)];
}

function ai() {
  if (charAt(1, 1) === ' ') {
    addChar(aiChar, 1, 1);
  } else {
    switch(turnNum) {
      case 5:
      break;
      default:
        console.log(turnNum);
        // play randomly
        var x = 1;
        var y = 1;
        while (charAt(x, y) != ' ') {
          x = Math.floor(Math.random() * 3);
          y = Math.floor(Math.random() * 3);
        }
        addChar(aiChar, x, y);
        break;
    }
  }
}

function winCondition() {
  if ((charAt(0, 0) === charAt(1, 1)) && (charAt (2, 2) === charAt(1, 1))) {
    if (charAt(1, 1) != ' ') {
      return [[0,0],[1,1],[2,2]];
    }
  }
  if ((charAt(0, 2) === charAt(1, 1)) && (charAt (2, 0) === charAt(1, 1))) {
    if (charAt(1, 1) != ' ') {
      return [[0,2],[1,1],[2,0]];
    }
  }
  for (var i = 0; i < 3; i++) {
    if ((charAt(0, i) === charAt(2, i)) && (charAt(0, i) === charAt(1, i))) {
      if (charAt(0, i) != ' ') {
        return [[0,i],[1,i],[2,i]];
      }
    }
    if ((charAt(i, 0) === charAt(i, 1)) && (charAt(i, 0) === charAt(i, 2))) {
      if (charAt(i, 0) != ' ') {
        return [[i,0],[i,1],[i,2]];
      }
    }
  }
  return false;
}

$(function() {
  $('body').css('max-width', $('#game').css('width'));
  setTimeout(drawBoard, 500);
  $('#game').on('click', function(e) {
    x = getX(e.clientX);
    y = getY(e.clientY);
    if ((x >= 0) && (y >= 0)) {
      addChar(userChar, x, y);
      turnNum++;
      if (winCondition()) {
        console.log('X wins');
      } else if (turnNum >= 5) {
        console.log('Tie Game.');
      }
      ai();
      if (winCondition()) {
        console.log('O wins.');
      }
    }
  });
});
