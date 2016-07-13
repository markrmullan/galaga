const MovingObject = require('./moving_object');
const Util = require('./utils');

const Ship = function(options) {
  this.game = options.game;
  this.position = options.position;
  this.width = 40;
  this.height = 40;
  this.img = new Image ();
  this.img.src = './images/Galaga_ship.png';
  MovingObject.call(this, options);
};

Util.inherits(Ship, MovingObject);

module.exports = Ship;
