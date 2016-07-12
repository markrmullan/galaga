const MovingObject = require('./moving_object');
const Util = require('./utils');

const Enemy = function(options) {
  // options.position = options.position;
  // options.velocity = options.velocity;
  this.x = 20;
  this.y = 20;
  this.width = 40;
  this.height = 40;
  this.img = new Image ();
  this.img.src = './images/yellow_galaga.png';
  MovingObject.call(this, options);
};

Util.inherits(Enemy, MovingObject);

window.Enemy = Enemy;

module.exports = Enemy;
