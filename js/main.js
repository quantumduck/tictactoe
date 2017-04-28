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
var xDivisions = 3;
var yDivisions = 3;

$(function() {
  $('body').css('max-width', $('#game').css('width'));
  var width = numFromPixels($('#game').css('width'));
  var height =  numFromPixels($('#game').css('height'));
  var offset_top = sumNumFromPixels([
    $('body').css('margin-top'),
    $('h1').css('height'),
    $('h1').css('margin-top'),
    $('h1').css('margin-bottom'),
  ]);
  var offset_left = numFromPixels($('body').css('margin-left'));
  setTimeout(drawBoard, 500);
  $('#game').on('click', function(e) {
    var x = Math.floor(xDivisions * (e.clientX - offset_left) / width);
    var y = Math.floor(yDivisions * (e.clientY - offset_top) / height);
    addChar('X', x, y);
  });
});

function drawBoard() {
  var text = "";
  for (y = 0; y < gameBoard.length; y++) {
    text += gameBoard[y] + '\n';
  }
  $('#game').text(text);
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
  x = xStart + (x * xSkip);
  y = yStart + (y * ySkip);
  var line = gameBoard[y];
  line = line.substring(0, x) + char + line.substring(x + 1, line.length);
  gameBoard[y] = line;
  drawBoard();
}
