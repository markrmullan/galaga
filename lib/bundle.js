/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const GameView = __webpack_require__(7);
	
	document.addEventListener("DOMContentLoaded", () => {
	  const canvas = document.getElementById("game-canvas");
	  canvas.width = Game.DIM_X;
	  canvas.height = Game.DIM_Y;
	
	  const ctx = canvas.getContext("2d");
	  const game = new Game();
	  new GameView(game, ctx).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Ship = __webpack_require__(2);
	const Enemy = __webpack_require__(5);
	const Utils = __webpack_require__(4);
	const Bullet = __webpack_require__(6);
	
	const Game = function () {
	  this.enemies = [];
	  this.userBullets = [];
	  this.computerBullets = [];
	  this.ships = [];
	  this.BG_COLOR = "#000000";
	  this.DIM_X = Game.DIM_X;
	  this.DIM_Y = Game.DIM_Y;
	  this.lives = 3;
	  this.score = 0;
	  this.addEnemies();
	};
	
	Game.prototype.addEnemies = function(){
	  const times = 10;
	  for (let i = 0; i < times; i++) {
	    this.add(new Enemy({game: this, position: [i * 40, 50], imgsrc: './images/Yellow_galaga.png'}));
	  }
	  for (let i = 0; i < times; i++) {
	    this.add(new Enemy({game: this, position: [i * 40, 90], imgsrc: './images/red_sprite_3.png', width: 30, height: 30}));
	  }
	};
	
	Game.prototype.addShip = function() {
	  const ship = new Ship ({
	    game: this,
	    position: [this.DIM_X - 300, this.DIM_Y - 100]
	  });
	
	  this.add(ship);
	  return ship;
	};
	
	Game.prototype.allObjects = function() {
	  return [].concat(this.ships, this.enemies, this.userBullets, this.computerBullets);
	};
	
	Game.prototype.draw = function(ctx) {
	  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	  ctx.fillStyle = this.BG_COLOR;
	  ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
	  this.allObjects().forEach((object) => {
	    object.draw(ctx);
	  });
	  ctx.fillStyle = "#3a3838";
	  ctx.fillRect(750, 0, 250, this.DIM_Y);
	  ctx.font = "16px myFont";
	  ctx.fillStyle = "white";
	  ctx.fillText("Score: " + this.score, this.DIM_X - 200, 250);
	  for (let i = 0; i < this.lives - 1; i++) {
	    let img = new Image();
	    img.src = './images/Galaga_ship.png';
	    ctx.drawImage(img, (this.DIM_X - 200) + (i * 40), 300, 30, 30);
	  }
	};
	
	Game.prototype.add = function (object) {
	  if (object instanceof Enemy) {
	    this.enemies.push(object);
	  } else if (object instanceof Bullet) {
	    this.userBullets.push(object);
	  } else if (object instanceof Ship) {
	    this.ships.push(object);
	  } else {
	    throw "wtf?";
	  }
	};
	
	Game.prototype.checkCollisions = function() {
	  const allObjects = this.allObjects();
	  for (let i = 0; i < allObjects.length; i++) {
	    for (let j = i + 1; j < allObjects.length; j++) {
	      const obj1 = allObjects[i];
	      const obj2 = allObjects[j];
	
	      if (obj1.isCollidedWith(obj2)) {
	        const collision = obj1.collideWith(obj2);
	        if (obj1 instanceof Enemy && obj2 instanceof Bullet) {
	          const e = this.enemies.indexOf(obj1);
	          const b = this.userBullets.indexOf(obj2);
	          // check to see if the Bullet is a userBullet, because computerBullets should not destroy enemies
	          if (e > -1 && b > -1) {
	            this.enemies.splice(e, 1);
	            this.userBullets.splice(b, 1);
	            this.score += 100;
	          }
	        }
	        if (obj1 instanceof Ship && obj2 instanceof Bullet) {
	          this.ships = [];
	          const b = this.computerBullets.indexOf(obj2);
	          this.computerBullets.splice(b, 1);
	          this.lives -= 1;
	          setTimeout(() => this.respawnIfLivesLeft(), 1500);
	        }
	        if (collision) return;
	      }
	    }
	  }
	};
	
	Game.prototype.fireBullet = function(position) {
	  if (this.userBullets.length === 2) {
	    return;
	  }
	  this.userBullets.push(new Bullet({position: [position[0] + 10, position[1] - 40], game: this, dy: [0, -10], imgsrc: './images/bullet.png'}));
	};
	
	Game.prototype.fireComputerBullets = function() {
	  // if there's more than 1 enemy still alive, find two of them to fire randomly
	  if (this.enemies.length > 1) {
	    // Get two random indices
	    let a = Math.floor(Math.random() * this.enemies.length);
	    let b = Math.floor(Math.random() * this.enemies.length);
	    // Ensure that the two indicies are different
	    while (a === b) {
	      b = Math.floor(Math.random() * this.enemies.length);
	    }
	    // Then grab the enemies from the enemies array
	    let pos1 = this.enemies[a].position;
	    let pos2 = this.enemies[b].position;
	    this.computerBullets.push(new Bullet({position: [pos1[0] + 10, pos1[1] + 40], game: this, dy: [0, 5], imgsrc: './images/computer_bullet.png'}));
	    this.computerBullets.push(new Bullet({position: [pos2[0] + 10, pos2[1] + 40], game: this, dy: [0, 5], imgsrc: './images/computer_bullet.png'}));
	  } else if (this.enemies.length === 1) {
	    // if there's one enemy alive, we want it to fire without throwing an error
	    let pos = this.enemies[0].position;
	    this.computerBullets.push(new Bullet({position: [pos[0] + 10, pos[1] + 40], game: this, dy: [0, 10], imgsrc: './images/computer_bullet.png'}));
	  }
	};
	
	Game.prototype.respawnIfLivesLeft = function() {
	  if (this.lives > 0) {
	    this.addShip();
	  }
	};
	
	// Galaga.js uses these constants. keep.
	Game.DIM_X = 1000;
	Game.DIM_Y = 600;
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(3);
	const Util = __webpack_require__(4);
	
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
	};
	
	
	module.exports = Ship;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);
	const Ship = __webpack_require__(2);
	
	function MovingObject (options) {
	  this.position = options.position;
	  this.game = options.game;
	}
	
	MovingObject.prototype.move = function(delta) {
	  if (this.direction === "right") {
	    this.position[0] = this.position[0] + this.dx;
	  }
	  if (this.direction === "left") {
	    this.position[0] = this.position[0] - this.dx;
	  }
	  if (delta) {
	    this.position = [this.position[0] + delta[0], this.position[1] + delta[1]];
	
	    //Prevents the 40px ship from moving off the 1000px wide screen, with a padding of 10px
	    this.position[0] = Math.max(10, Math.min(this.position[0], this.game.DIM_X - 300));
	  }
	};
	
	MovingObject.prototype.isCollidedWith = function(otherObject) {
	  const centerDist = Util.dist(this.centerPoint(), otherObject.centerPoint());
	  return centerDist < ((this.height / 2) + (otherObject.height / 2));
	};
	
	MovingObject.prototype.draw = function(ctx) {
	  ctx.drawImage(this.img, this.position[0], this.position[1], this.width, this.height);
	};
	
	MovingObject.prototype.collideWith = function (otherObject) {
	  // default do nothing
	};
	
	MovingObject.prototype.fireBullet = function() {
	  // console.log("firing mah lazers!");
	};
	
	MovingObject.prototype.centerPoint = function(){
	  return [this.position[0] + (this.width / 2), this.position[1] + (this.height / 2)];
	};
	
	module.exports = MovingObject;


/***/ },
/* 4 */
/***/ function(module, exports) {

	const Util = {
	  inherits(childClass, parentClass) {
	    function Surrogate () {}
	    Surrogate.prototype = parentClass.prototype;
	    childClass.prototype = new Surrogate();
	    childClass.prototype.constructor = childClass;
	  },
	
	  dist (pos1, pos2) {
	  return Math.sqrt(
	    Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
	  );
	},
	};
	
	module.exports = Util;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(3);
	const Util = __webpack_require__(4);
	const Bullet = __webpack_require__(6);
	
	function Enemy (options) {
	  MovingObject.call(this, options);
	  this.direction = "right";
	  this.position = options.position;
	  this.width = 40;
	  this.height = 40;
	  this.dx = 2;
	  this.img = new Image ();
	  this.img.src = options.imgsrc;
	}
	Util.inherits(Enemy, MovingObject);
	
	module.exports = Enemy;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);
	const MovingObject = __webpack_require__(3);
	
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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* globals key*/
	
	const Ship = __webpack_require__(2);
	
	const GameView = function(game, ctx) {
	  this.game = game;
	  this.ctx = ctx;
	  this.ship = this.game.addShip();
	};
	
	GameView.prototype.start = function () {
	  this.bindKeyHandlers();
	  this.attack();
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
	  //every call to animate requests causes another call to animate.
	  //need to set a timeout to allow other async functions, like firing computer
	  //bullets, and pausing between respawns, to execute.
	  let that = this;
	  setTimeout(() => requestAnimationFrame(this.animate.bind(this)), 0);
	};
	
	GameView.prototype.bindKeyHandlers = function () {
	  const ship = this.ship;
	  key("space", () => {
	    this.game.fireBullet(this.ship.position);
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
	  if (this.game.enemies.some(enemy => (enemy.position[0] + 290 > this.game.DIM_X))) {
	    this.game.enemies.forEach((enemy) => {
	      enemy.direction = "left";
	    });
	  }
	  if (this.game.enemies.some(enemy => (enemy.position[0] < 0 ))) {
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
	    if (bullet.position[1] < 0) {
	      this.game.userBullets.splice(idx, 1);
	    }
	  });
	  this.game.computerBullets.forEach((bullet, idx) => {
	    if (bullet.position[1] > this.game.DIM_Y) {
	      this.game.computerBullets.splice(idx, 1);
	    }
	  });
	  if (this.game.ships[0]){
	    this.ship = this.game.ships[0];
	  }
	};
	
	GameView.prototype.attack = function(){
	  this.attackInterval = setInterval(() => this.game.fireComputerBullets(), 2500);
	};
	
	GameView.MOVES = {
	  "a": [-10],
	  "d": [ 10],
	};
	
	module.exports = GameView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map