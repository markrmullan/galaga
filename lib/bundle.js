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

	const Ship = __webpack_require__(1);
	const Enemy = __webpack_require__(2);
	const Utils = __webpack_require__(4);
	
	const Game = function() {
	
	};
	
	Game.prototype.addEnemies = function(){
	  const times = 20;
	  for (let i = 0; i < times; i++) {
	
	  }
	};
	
	Game.DIM_X = 1000;
	Game.DIM_Y = 600;
	Game.FPS = 32;


/***/ },
/* 1 */
/***/ function(module, exports) {



/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(3);
	const Util = __webpack_require__(4);
	
	const Enemy = function(options) {
	  options.pos = options.pos || options.game.randomPosition();
	  options.vel = options.vel;
	
	  MovingObject.call(this, options);
	};
	
	
	
	
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
	
	  const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
	    offsetX = this.velocity[0] * velocityScale,
	    offsetY = this.velocity[1] * velocityScale;
	
	  this.position = [this.position[0] + offsetX, this.position[1] + offsetY];
	};
	
	MovingObject.prototype.draw = function() {
	
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map