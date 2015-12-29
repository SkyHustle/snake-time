function Block (board, x, y) {
  this.board  = board;
  this.x      = x;
  this.y      = y;
  this.width  = 30;
  this.height = 30;
}

Block.prototype.draw = function (context) {
  context.beginPath();
  context.rect(this.x, this.y, this.width, this.height);
  // context.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);
  context.fillStyle = 'orange';
  context.fill();
  return this;
}

module.exports = {Block: Block};
