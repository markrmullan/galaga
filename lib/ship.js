const MovingObject = require('./moving_object');
const Util = require('./utils');

const Ship = function(options) {
  MovingObject.call(this, options);
  this.game = options.game;
  this.position = options.position;
  this.width = 40;
  this.height = 40;
  this.img = new Image ();
  this.img.src = './images/Galaga_ship.png';
};
Util.inherits(Ship, MovingObject);

Ship.prototype.collideWith = function(otherObject){
  // console.log("in the ship collide with");
  // if (otherObject instanceof Bullet) {
  //   this.remove();
  //   console.log("getting here");
  //   otherObject.remove();
  //   return true;
  // }
};


module.exports = Ship;
