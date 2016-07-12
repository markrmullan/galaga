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

	const Game = __webpack_require__(6);
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
/***/ function(module, exports) {

	const Ship = function() {
	  console.log("hello from the ship constructor");
	};
	
	module.exports = Ship;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(3);
	const Util = __webpack_require__(4);
	
	const Enemy = function(options) {
	  // options.position = options.position;
	  // options.velocity = options.velocity;
	  this.x = 20;
	  this.y = 20;
	  this.width = 40;
	  this.height = 40;
	  this.img = new Image ();
	  this.img.src = './images/yellow_galaga.png';
	  MovingObject.call(this, options);
	};
	
	Util.inherits(Enemy, MovingObject);
	
	window.Enemy = Enemy;
	
	module.exports = Enemy;


/***/ },
/* 3 */
/***/ function(module, exports) {

	const MovingObject = function (options) {
	  this.position = options.position;
	  this.velocity = options.velocity;
	  this.game = options.game;
	};
	
	const NORMAL_FRAME_TIME_DELTA = 1000/60;
	MovingObject.prototype.move = function(timeDelta) {
	  // const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
	  //   offsetX = this.velocity[0] * velocityScale,
	  //   offsetY = this.velocity[1] * velocityScale;
	
	  this.position = [this.position[0] + 1, this.position[1] + 1];
	};
	
	MovingObject.prototype.draw = function(ctx) {
	  ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	};
	
	module.exports = MovingObject;


/***/ },
/* 4 */
/***/ function(module, exports) {

	const Util = {
	  inherits(childClass, parentClass) {
	    function Surrogate () { this.constructor = childClass; }
	    Surrogate.prototype = parentClass.prototype;
	    childClass.prototype = new Surrogate();
	  }
	};
	
	module.exports = Util;


/***/ },
/* 5 */
/***/ function(module, exports) {



/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Ship = __webpack_require__(1);
	const Enemy = __webpack_require__(2);
	const Utils = __webpack_require__(4);
	const Bullet = __webpack_require__(5);
	
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


/***/ },
/* 7 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map