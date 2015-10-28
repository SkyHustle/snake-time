/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Block = __webpack_require__(2).Block;
	var Board = __webpack_require__(3).Board;
	var Snake = __webpack_require__(5).Snake;
	var Food = __webpack_require__(4).Food;

	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	var board = new Board(600, 400);
	var snake = new Snake(board);
	var food = new Food(board);

	var direction = '0';

	function overlay() {
	  var el = document.getElementById("overlay");
	  el.style.visibility = el.style.visibility == "visible" ? "hidden" : "visible";
	}

	requestAnimationFrame(function gameLoop() {
	  context.clearRect(0, 0, canvas.width, canvas.height);

	  board.draw(context);
	  food.draw(context);

	  document.onkeydown = function (e) {
	    direction = e.keyCode.toString();
	  };

	  if (snake.collisionAtEdge()) {
	    return overlay();
	  }

	  if (snake.collisionWithSelf(direction)) {
	    return overlay();
	  }

	  snake.move(direction);
	  requestAnimationFrame(gameLoop);
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	function Block(board, x, y) {
	  this.board = board;
	  this.x = x;
	  this.y = y;
	  this.width = 10;
	  this.height = 10;
	  this.active = true;
	}

	Block.prototype.draw = function (context) {
	  context.beginPath();
	  context.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);
	  context.fillStyle = 'brown';
	  context.fill();
	  return this;
	};

	Block.prototype.inactive = function () {
	  return !this.active;
	};

	Block.prototype.isAtTop = function () {
	  return this.y + 11 > this.board.rows;
	};

	Block.prototype.blockBelow = function () {
	  return this.board.findBlock(this.x, this.y + 1);
	};

	Block.prototype.blockToTheRight = function () {
	  return this.board.findBlock(this.x + 1, this.y);
	};

	module.exports = { Block: Block };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Block = __webpack_require__(2).Block;
	var Food = __webpack_require__(4).Food;

	function Board(columns, rows) {
	  this.columns = columns;
	  this.rows = rows;
	  this.blocks = [];
	  this.food = [];
	  this.score = 0;
	}

	Board.prototype.draw = function (context) {
	  this.blocks.forEach(function (block) {
	    block.draw(context);
	  });
	};

	Board.prototype.findBlock = function (x, y) {
	  for (var i = 0; i < this.blocks.length; i++) {
	    if (this.blocks[i].x === x && this.blocks[i].y === y) {
	      return this.blocks[i];
	    }
	  }
	};

	Board.prototype.addBlock = function (x, y) {
	  var block = new Block(this, x, y);
	  this.blocks.push(block);
	  return block;
	};

	Board.prototype.addFood = function (food) {
	  this.food.push(food);
	};

	module.exports = { Board: Board };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Block = __webpack_require__(2).Block;
	var Board = __webpack_require__(3).Board;
	var Snake = __webpack_require__(5).Snake;

	//image = 'mouse.png';

	function Food(board) {
	  this.board = board;
	  this.width = 10;
	  this.height = 10;
	  this.setRandomPosition();
	  this.board.addFood(this);
	}

	Food.prototype.draw = function (context) {
	  context.beginPath();
	  context.arc(this.x, this.y, 8, 0, 2 * Math.PI, false);
	  context.lineWidth = 2;
	  context.strokeStyle = 'orange';
	  context.stroke();
	  return this;
	};

	Food.prototype.setRandomPosition = function () {
	  this.x = Math.floor(Math.random() * 560 - 20 + 20);
	  this.y = Math.floor(Math.random() * 360 - 20 + 20);
	};

	Food.prototype.wasEaten = function () {
	  this.setRandomPosition();
	};

	module.exports = { Food: Food };

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Block = __webpack_require__(2).Block;
	var Board = __webpack_require__(3).Board;

	function Snake(board) {
	    this.board = board;
	    this.body = [new Block(board, 40, 40)];
	    this.head = this.body[0];
	    this.board.blocks.push(this.head);
	    this.velocity = 2;
	    return this;
	}

	Snake.prototype.move = function (direction) {
	    //down
	    if (direction == '38') {
	        if (this.canMoveDown()) {
	            this.moveDown();
	        } else {
	            console.log(this.board.score);
	        }
	    }
	    //up
	    else if (direction == '40') {
	            if (this.canMoveUp()) {
	                this.moveUp();
	            } else {
	                console.log(this.board.score);
	            }
	        }
	        //left
	        else if (direction == '37') {
	                if (this.canMoveLeft()) {
	                    this.moveLeft();
	                } else {
	                    console.log(this.board.score);
	                }
	            }
	            //right
	            else if (direction == '39') {
	                    if (this.canMoveRight()) {
	                        this.moveRight();
	                    } else {
	                        console.log(this.board.score);
	                    }
	                }
	};

	Snake.prototype.collisionAtEdge = function () {
	    return this.isAtTop() || this.isAtBottom() || this.isAtLeftEdge() || this.isAtRightEdge();
	};

	Snake.prototype.collisionWithSelf = function (direction) {
	    if (direction === '39' && this.blockToTheRight()) {
	        return true;
	    } else if (direction === '37' && this.blockToTheLeft()) {
	        return true;
	    } else if (direction === '38' && this.blockOnTop()) {
	        return true;
	    } else if (direction === '40' && this.blockBelow()) {
	        return true;
	    }
	};

	Snake.prototype.headCheckForFood = function () {
	    var xDiff = Math.abs(this.head.x - this.board.food[0].x);
	    var yDiff = Math.abs(this.head.y - this.board.food[0].y);

	    if (xDiff < 10 && yDiff < 10) {
	        for (var i = 0; i < 15; i++) {
	            this.eat(new Block(this.board, this.body[0].x, this.body[0].y));
	        }
	        this.board.food[0].wasEaten();
	        this.board.score += 100;
	        $('span').text(this.board.score);
	    }
	};

	Snake.prototype.moveRight = function () {
	    var snakeLength = this.body.length;
	    for (var i = 1; i < snakeLength; i++) {
	        this.body[snakeLength - i].x = this.body[snakeLength - i - 1].x;
	        this.body[snakeLength - i].y = this.body[snakeLength - i - 1].y;
	    }
	    this.head.x += this.velocity;

	    this.headCheckForFood();
	};

	Snake.prototype.moveLeft = function () {
	    var snakeLength = this.body.length;

	    for (var i = 1; i < snakeLength; i++) {
	        this.body[snakeLength - i].x = this.body[snakeLength - i - 1].x;
	        this.body[snakeLength - i].y = this.body[snakeLength - i - 1].y;
	    }
	    this.head.x -= this.velocity;

	    this.headCheckForFood();
	};

	Snake.prototype.moveUp = function () {
	    var snakeLength = this.body.length;

	    for (var i = 1; i < snakeLength; i++) {
	        this.body[snakeLength - i].x = this.body[snakeLength - i - 1].x;
	        this.body[snakeLength - i].y = this.body[snakeLength - i - 1].y;
	    }
	    this.head.y += this.velocity;

	    this.headCheckForFood();
	};

	Snake.prototype.moveDown = function () {
	    var snakeLength = this.body.length;

	    for (var i = 1; i < snakeLength; i++) {
	        this.body[snakeLength - i].x = this.body[snakeLength - i - 1].x;
	        this.body[snakeLength - i].y = this.body[snakeLength - i - 1].y;
	    }
	    this.head.y -= this.velocity;

	    this.headCheckForFood();
	};

	Snake.prototype.canMoveUp = function () {
	    return !(this.isAtTop() || this.blockBelow());
	};

	Snake.prototype.isAtRightEdge = function () {
	    return this.head.x + 11 > this.board.columns;
	};

	Snake.prototype.canMoveRight = function () {
	    return !(this.isAtRightEdge() || this.blockToTheRight());
	};

	Snake.prototype.isAtLeftEdge = function () {
	    return this.head.x - 11 < 0;
	};

	Snake.prototype.canMoveLeft = function () {
	    return !(this.isAtLeftEdge() || this.blockToTheLeft());
	};

	Snake.prototype.isAtBottom = function () {
	    return this.head.y - 11 < 0;
	};

	Snake.prototype.isAtTop = function () {
	    return this.head.y + 11 > this.board.rows;
	};

	Snake.prototype.canMoveDown = function () {
	    return !(this.isAtBottom() || this.blockOnTop());
	};

	Snake.prototype.blockToTheLeft = function () {
	    return !!this.board.findBlock(this.head.x - 2, this.head.y);
	};

	Snake.prototype.blockToTheRight = function () {
	    return !!this.board.findBlock(this.head.x + 2, this.head.y);
	};

	Snake.prototype.blockOnTop = function () {
	    return !!this.board.findBlock(this.head.x, this.head.y - 2);
	};

	Snake.prototype.blockBelow = function () {
	    return !!this.board.findBlock(this.head.x, this.head.y + 2);
	};

	Snake.prototype.draw = function () {
	    context.fillRect(this.head.x, this.head.y, this.head.width, this.head.height);
	    return this;
	};

	Snake.prototype.eat = function (block) {
	    this.body.push(block);
	    this.board.blocks.push(block);
	};

	module.exports = { Snake: Snake, Block: Block };

/***/ }
/******/ ]);