var gameBoard = "   |   |   \n---+---+---\n   |   |   \n---+---+---\n   |   |   ";
var xStart = 1;
var sSkip = 4;
var yStart = 0;
var ySkip = 2;

$(function() {
  var width = numFromPixels($('#game').css('width'));
  var height =  numFromPixels($('#game').css('height'));
  var offset_top = sumNumFromPixels([
    $('body').css('margin-top'),
    $('h1').css('height'),
    $('h1').css('margin-top'),
    $('h1').css('margin-bottom'),
  ]);
  var offset_left = sumNumFromPixels([
    $('body').css('margin-top'),
    $('#game').css('margin-left'),
  ]);
  setTimeout(drawBoard, 500);
  $('#game').on('click', function(e) {
    var rawX = e.clientX - offset_left;
    var rawY = e.clientY - offset_top;
  });
});

function drawBoard() {
  $('#game').text(gameBoard);
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
