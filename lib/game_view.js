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
  if (this.ship) {
    this.moveShip();
  }
  this.game.checkCollisions();
  this.removeBullets();
  //every call to animate requests causes another call to animate
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.bindKeyHandlers = function () {
  const ship = this.ship;
  key("space", () => {
    this.game.fireBullet(this.ship.position);
    this.game.fireComputerBullets();
  });
};

GameView.prototype.moveShip = function(){
  if (key.isPressed("A")) this.ship.move([-5, 0]);
  if (key.isPressed("D")) this.ship.move([5, 0]);
};

GameView.prototype.moveEnemies = function() {
  if (this.game.enemies.length === 0) {
    return;
  }
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
  this.game.userBullets.forEach((bullet) => {
    bullet.move(bullet.dy);
  });
  this.game.computerBullets.forEach((bullet) => {
    bullet.move(bullet.dy);
  });
};

GameView.prototype.removeBullets = function() {
  this.game.userBullets.forEach((bullet, idx) => {
    if (bullet.position[1] < 0 || bullet.position[1] > this.game.DIM_Y) {
      this.game.userBullets.splice(idx, 1);
    }
  });
  if (this.game.ships[0]){
    this.ship = this.game.ships[0];
  }
};

GameView.MOVES = {
  "a": [-10],
  "d": [ 10],
};

module.exports = GameView;
