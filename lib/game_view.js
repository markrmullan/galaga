const Ship = require('./ship');

const GameView = function(game, ctx) {
  this.game = game;
  this.ctx = ctx;
  this.ship = this.game.addShip();
};

GameView.prototype.start = function () {
  this.bindKeyHandlers();
  //start the animation
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function(time){
  this.game.draw(this.ctx);
  if (this.game.enemies.some(enemy => enemy.position[0] + 40 > this.game.DIM_X)) {
    this.game.enemies.forEach((enemy) => {
      enemy.direction = "left";
    });
  }
  if (this.game.enemies.some(enemy => enemy.position[0] < 0)) {
    this.game.enemies.forEach((enemy) => {
      enemy.direction = "right";
    });
  }
  this.game.enemies.forEach((enemy) => {
    enemy.move();
  });
  this.game.checkCollisions();
  //every call to animate requests causes another call to animate
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.bindKeyHandlers = function () {
  const ship = this.ship;

  Object.keys(GameView.MOVES).forEach((k) => {
    let move = GameView.MOVES[k];
    key(k, function () { ship.move(move); });
  });
  console.log(this.ship);
  console.log(this.ship.fireBullet);
  console.log(this.ship.prototype);
  key("space", () => {
    console.log(this.ship);
    this.ship.fireBullet(); });
};

GameView.MOVES = {
  "a": [-5,  0],
  "d": [ 5,  0],
};

module.exports = GameView;
