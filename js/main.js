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
  $('#game').on('click', function(e) {
    var x = e.clientX - offset_left;
    var y = e.clientY - offset_top;
  });
});

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
