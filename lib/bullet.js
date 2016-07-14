const Util = require('./utils');
const MovingObject = require('./moving_object');

function Bullet (options) {
  MovingObject.call(this, options);
  this.dy = options.dy;
  this.position = options.position;
  this.width = 20;
  this.height = 20;
  this.game = options.game;
  this.img = new Image ();
  this.img.src = options.imgsrc;
}
Util.inherits(Bullet, MovingObject);

Bullet.prototype.collideWith = function(otherObject){
  // console.log("in the bullet collide with");
  // if (otherObject instanceof Bullet) {
  //   this.remove();
  //   console.log("getting here");
  //   otherObject.remove();
  //   return true;
  // }
};


module.exports = Bullet;
