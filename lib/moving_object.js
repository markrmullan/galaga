const MovingObject = function (options) {
  this.position = options.position;
  this.velocity = options.velocity;
  this.game = options.game;
};

const NORMAL_FRAME_TIME_DELTA = 1000/60;
MovingObject.prototype.move = function(timeDelta) {

  const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
    offsetX = this.velocity[0] * velocityScale,
    offsetY = this.velocity[1] * velocityScale;

  this.position = [this.position[0] + offsetX, this.position[1] + offsetY];
};

MovingObject.prototype.draw = function() {

};

module.exports = MovingObject;
