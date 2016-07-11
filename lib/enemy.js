const MovingObject = require('./moving_object');
const Util = require('./utils');

const Enemy = function(options) {
  options.pos = options.pos || options.game.randomPosition();
  options.vel = options.vel;

  MovingObject.call(this, options);
};




module.exports = Enemy;
