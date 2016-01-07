const Block     = require('../lib/block').Block;
const Board     = require('../lib/board').Board;
const Snake     = require('../lib/snake').Snake;
const Food      = require('../lib/food').Food;

let canvas    = document.querySelector('canvas');
let context   = canvas.getContext('2d');


let docWidth   = document.documentElement.clientWidth
let docHeight  = document.documentElement.clientHeight

canvas.width   = docWidth
canvas.height  = docHeight


let board = new Board(canvas.width, canvas.height);
let snake = new Snake(board);
let food  = new Food(board);

function overlay() {
  canvas.style.display = 'none'
  let el = document.getElementById('overlay');
  el.style.visibility = (el.style.visibility == 'visible') ? 'hidden' : 'visible';
}

$('#play-again').on('click', function () {
  window.location.reload()
})

$('button').on('touchend', function () {
  $(this).addClass("clicked_button").delay(500).queue( function(next) {
    $(this).removeClass("clicked_button");
    next();
  });
  Direction = this.id
})

window.addEventListener('orientationchange', function () {
  var originalBodyStyle = getComputedStyle(document.body).getPropertyValue('display');
  document.body.style.display='none';
  setTimeout(function () {
    document.body.style.display = originalBodyStyle;
  }, 10);
});

let Direction = 0

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  board.draw(context);
  food.draw(context);

  document.onkeydown = function(e) {
    if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
      Direction = e.keyCode.toString();
    }
  };

  if (snake.collisionAtEdge() || snake.collisionWithSelf(Direction)) {
    return overlay()
  }

  snake.move(Direction);
  requestAnimationFrame(gameLoop);
});
