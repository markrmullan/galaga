/* globals key*/

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
  // LET'S ANIMATE BABY
  this.game.draw(this.ctx);
  this.moveEnemies();
  this.moveBullets();
  this.moveShip();
  this.game.checkCollisions();
  this.removeBullets();
  //every call to animate requests causes another call to animate
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.bindKeyHandlers = function () {
  const ship = this.ship;
  key("space", () => {
    this.game.fireBullet(this.ship.position); });
};

GameView.prototype.moveShip = function(){
  if (key.isPressed("A")) this.ship.move([-5, 0]);
  if (key.isPressed("D")) this.ship.move([5, 0]);
};

GameView.prototype.moveEnemies = function() {
  if (this.game.enemies[this.game.enemies.length - 1].position[0] + 40 > this.game.DIM_X) {
    this.game.enemies.forEach((enemy) => {
      enemy.direction = "left";
    });
  }
  if (this.game.enemies[0].position[0] < 0) {
    this.game.enemies.forEach((enemy) => {
      enemy.direction = "right";
    });
  }
  this.game.enemies.forEach((enemy) => {
    enemy.move();
  });
};

GameView.prototype.moveBullets = function() {
  this.game.bullets.forEach((bullet) => {
    bullet.move([0, -10]);
  });
};

GameView.prototype.removeBullets = function() {
  this.game.bullets.forEach((bullet, idx) => {
    if (bullet.position[1] < 0) {
      this.game.bullets.splice(idx, 1);
    }
  });
};

GameView.MOVES = {
  "a": [-10],
  "d": [ 10],
};

module.exports = GameView;
