const chai     = require('chai');
const assert   = chai.assert;
const Block    = require('../lib/block').Block;
const Board    = require('../lib/board').Board;
const Snake    = require('../lib/snake').Snake;
const Food     = require('../lib/food').Food;


describe('Food', function () {
    it('exists', function () {
        let board = new Board(600, 600);
        assert(new Food(board));
    });

    it('has a location', function () {
        let board = new Board(600, 600);
        let food = new Food(board);
        assert(food.x);
        assert(food.y);
    });

    it('instantiates at a random location', function () {
        let board = new Board(600, 600);
        let food1 = new Food(board);
        let food2 = new Food(board);
        assert.notDeepEqual(food1, food2);
    })
});

