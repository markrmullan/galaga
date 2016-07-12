const GameView = function(game, ctx) {
  this.game = game;
  this.ctx = ctx;
  // this.ship = this.game.addShip();
};

GameView.prototype.start = function () {
  // this.bindKeyHandlers();
  this.lastTime = 0;
  //start the animation
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function(time){
  // const timeDelta = time - this.lastTime;
  // this.game.step(timeDelta);
  this.game.draw(this.ctx);
  this.lastTime = time;

  //every call to animate requests causes another call to animate
  requestAnimationFrame(this.animate.bind(this));
};

module.exports = GameView;
