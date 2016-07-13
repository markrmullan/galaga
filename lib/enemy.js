const MovingObject = require('./moving_object');
const Util = require('./utils');

const Enemy = function(options) {
  // options.position = options.position;
  // options.velocity = options.velocity;
  this.direction = "right";
  this.position = options.position;
  this.width = 40;
  this.height = 40;
  this.img = new Image ();
  this.img.src = options.imgsrc;
  MovingObject.call(this, options);
};

Util.inherits(Enemy, MovingObject);

module.exports = Enemy;
