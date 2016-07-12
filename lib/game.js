const Ship = require('./ship');
const Enemy = require('./enemy');
const Utils = require('./utils');
const Bullet = require('./bullet');

const Game = function () {
  this.enemies = [];
  this.bullets = [];
  this.ships = [];

  this.addEnemies();
};

Game.BG_COLOR = "#000000";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 32;
Game.ENEMY_DIRECTION = "RIGHT";

Game.prototype.addEnemies = function(){
  const times = 20;
  for (let i = 0; i < times; i++) {
    this.add(new Enemy({game: this, position: [i * 10, 50]}));
  }
};

Game.prototype.allObjects = function() {
  return [].concat(this.ships, this.enemies, this.bullets);
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.allObjects().forEach((object) => {
    object.draw(ctx);
  });
};

Game.prototype.add = function (object) {
  if (object instanceof Enemy) {
    this.enemies.push(object);
  } else if (object instanceof Bullet) {
    this.bullets.push(object);
  } else if (object instanceof Ship) {
    this.ships.push(object);
  } else {
    throw "wtf?";
  }
};

Game.prototype.moveEnemies = function(){
  if (this.direction === "RIGHT") {
    this.enemies.forEach((enemy) => {
      enemy.move();
    });
  } else {
    this.enemies.forEach((enemy) => {
      enemy.move();
    });
  }
};

Game.prototype.addShip = function() {
  // const ship = new Ship ({
  //   game: this,
  //   position: [this.DIM_X - 100, this.DIM_Y - 100]
  // });
  //
  // this.add(ship);
  //
  // return ship;
};

Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 32;

module.exports = Game;
