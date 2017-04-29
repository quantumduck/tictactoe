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
var gridSize = 3;
var userChar = 'X';
var aiChar = 'O';
var turnNum = 0;

var lines = [];
var diag1 = [];
var diag2 = [];
for (var i = 0; i < gridSize; i++) {
  var row = [];
  var col = [];
  for (var j = 0; j < gridSize; j++) {
    row.push({x: i, y: j});
    col.push({x: j, y: i});
  }
  lines.push(row);
  lines.push(col);
  diag1.push({x: i, y: i});
  diag2.push({x: i, y: (gridSize - i - 1)});
}
lines.push(diag1);
lines.push(diag2);

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
  var sum = 0;
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

function aiHard() {
  switch (charAt(1, 1)) {
    case ' ':
      addChar(aiChar, 1, 1);
      break;
    case userChar:

  }
}

function ai() {
  var x = 1;
  var y = 1;
  while (charAt(x, y) != ' ') {
    var x = Math.floor(Math.random() * 3);
    var y = Math.floor(Math.random() * 3);
  }
  addChar(aiChar, x, y);
}

function winCondition() {
  for (var l = 0; l < lines.length; l++) {
    var line = lines[l];
    // console.log(line);
    var char = charAt(line[0].x, line[0].y);
    if (char != ' ') {
      var i = 0;
      while (char === charAt(line[i].x, line[i].y)) {
        if (++i === gridSize) {
          break;
        }
      }
      if (i === gridSize) {
        return line;
      }
    }
  }
  return false;
}

function winInOne() {
  for (var l = 0; l < lines.length; l++) {
    var line = lines[l];
    var char = charAt(line[0].x, line[0].y);
    var i = 1;
    while (char === charAt(line[i].x, line[i].y)) {
      i++;
    }
    if (i === gridSize) {
      return line;
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
        $('#message-box').text('You Win!');
      } else if (turnNum >= 5) {
        $('#message-box').text('Tie Game.');
      } else {
        ai();
        if (winCondition()) {
          $('#message-box').text('I Win!');
        }
      }
    }
  });
});
