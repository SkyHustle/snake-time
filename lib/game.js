const Block    = require('../lib/block').Block;
const Board    = require('../lib/board').Board;
const Snake    = require('../lib/snake').Snake;
const Food     = require('../lib/food').Food;

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
  canvas.style.display = "none"
  let el = document.getElementById("overlay");
  el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}

$('#play-again').click(function () {
  window.location.reload()
})


$(function () {
  //Enable swiping...
  $("#test").swipe( {
    swipeStatus:function(event, phase, direction, distance, duration, fingers, fingerData, currentDirection)
    {
      Direction = currentDirection
      var str = "<h4>Swipe Phase : " + phase + "<br/>";
      str += "Current direction: " + currentDirection + "<br/>";
      str += "Direction from inital touch: " + direction + "<br/>";
      str += "Distance from inital touch: " + distance + "<br/>";
      str += "Duration of swipe: " + duration + "<br/>";
      str += "Fingers used: " + fingers + "<br/></h4>";
      //Here we can check the:
      //phase : 'start', 'move', 'end', 'cancel'
      //direction : 'left', 'right', 'up', 'down'
      //distance : Distance finger is from initial touch point in px
      //duration : Length of swipe in MS
      //fingerCount : the number of fingers used
      if (phase!="cancel" && phase!="end") {
        if (duration<5000)
          str +="Under maxTimeThreshold.<h3>Swipe handler will be triggered if you release at this point.</h3>"
        else
          str +="Over maxTimeThreshold. <h3>Swipe handler will be canceled if you release at this point.</h3>"
        if (distance<200)
          str +="Not yet reached threshold.  <h3>Swipe will be canceled if you release at this point.</h3>"
        else
          str +="Threshold reached <h3>Swipe handler will be triggered if you release at this point.</h3>"
      }
      if (phase=="cancel")
        str +="<br/>Handler not triggered. <br/> One or both of the thresholds was not met "
      if (phase=="end")
        str +="<br/>Handler was triggered."
      $("#test").html(str);
    },
    threshold:200,
    maxTimeThreshold:5000,
    fingers:'all'
  });
});

let Direction

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
