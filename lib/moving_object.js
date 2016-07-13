const Util = require('./utils');
const Ship = require('./ship');

const MovingObject = function (options) {
  this.position = options.position;
  this.velocity = options.velocity;
  this.game = options.game;
  this.centerPoint = [(this.position[0] + this.width) / 2, (this.position[1] + this.height) / 2];
};

MovingObject.prototype.move = function(delta) {
  if (this.direction === "right") {
    this.position = [this.position[0] + 2, this.position[1]];
  }
  if (this.direction === "left") {
    this.position = [this.position[0] - 2, this.position[1]];
  }
  if (delta) {
    this.position[0] = this.position[0] + delta[0];

    //Prevents the 40px ship from moving off the 1000px wide screen, with a padding of 10px
    this.position[0] = Math.max(10, Math.min(this.position[0], 950));
  }
};

MovingObject.prototype.isCollidedWith = function(otherObject) {
  const centerDist = Util.dist(this.centerPoint, otherObject.centerPoint);
  return centerDist < ((this.height / 2) + (otherObject.height / 2));
};

MovingObject.prototype.draw = function(ctx) {
  ctx.drawImage(this.img, this.position[0], this.position[1], this.width, this.height);
};

MovingObject.prototype.collideWith = function (otherObject) {
  // default do nothing
  console.log("COLLISION!!!!!");
};

MovingObject.prototype.fireBullet = function() {
  console.log("firing mah lazers!");
};

module.exports = MovingObject;
