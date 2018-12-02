/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/carry_item.js":
/*!**************************!*\
  !*** ./js/carry_item.js ***!
  \**************************/
/*! exports provided: CarryItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarryItem", function() { return CarryItem; });
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ "./js/consts.js");
/* harmony import */ var _character__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./character */ "./js/character.js");





class CarryItem extends _character__WEBPACK_IMPORTED_MODULE_1__["Character"] {
  constructor(state) {
    super(state);
    this.enabled = true;
    this.flying = false;
  }

  canBeCarried(player) {
    if (this.enabled) {
      let effectivePlayerY = player.posY - 5;
      let effectivePlayerPoint = new Kiwi.Geom.Point(player.posX, effectivePlayerY);

      if (this.sprite.physics.box.worldHitbox.containsPoint(effectivePlayerPoint)) {
        return true;
      }
    }

    return false;
  }

  update() {
    super.update();

    if (this.isTouching(_consts__WEBPACK_IMPORTED_MODULE_0__["DOWN"])) {
      this.velocityX = 0;
      this.velocityY = 0;
    }

    if (this.velocityY == 0) {
      this.flying = false;
    }
  }

}



/***/ }),

/***/ "./js/character.js":
/*!*************************!*\
  !*** ./js/character.js ***!
  \*************************/
/*! exports provided: Character */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Character", function() { return Character; });
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ "./js/consts.js");
/* harmony import */ var _game_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game_config */ "./js/game_config.js");





function CharacterSprite(state, texture, hitbox, anchorx = null, anchory = null) {
  Kiwi.GameObjects.Sprite.call(this, state, texture, 0, 0);
  this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));
  this.physics.box.hitbox = hitbox;
  this.physics.acceleration.y = _game_config__WEBPACK_IMPORTED_MODULE_1__["GRAVITY"];

  if (anchorx === null) {
    this.transform.anchorPointX = hitbox.x + hitbox.width / 2;
  } else {
    this.transform.anchorPointX = anchorx;
  }

  if (anchory === null) {
    this.transform.anchorPointY = hitbox.y + hitbox.height / 2;
  } else {
    this.transform.anchorPointY = anchory;
  }
}

CharacterSprite.prototype.update = function () {
  Kiwi.GameObjects.Sprite.prototype.update.call(this);
  this.physics.update();
};

Kiwi.extend(CharacterSprite, Kiwi.GameObjects.Sprite);

class Character {
  constructor(state) {
    this.state = state;
    this.dir = _consts__WEBPACK_IMPORTED_MODULE_0__["RIGHT"];
    this.DEFAULT_DIR = _consts__WEBPACK_IMPORTED_MODULE_0__["RIGHT"];
    this.SPRITE_SIZE = 128;
    this.HITBOX = new Kiwi.Geom.Rectangle(0, 0, 128, 128);
    this.SPRITE_FILE = "";
    this.NAME = "";
    this.plannedPos = null;
  }

  preload() {
    this.state.addSpriteSheet(this.NAME + "Sprite", this.SPRITE_FILE, this.SPRITE_SIZE, this.SPRITE_SIZE);
  }

  create() {
    this.sprite = new CharacterSprite(this.state, this.state.textures[this.NAME + "Sprite"], this.HITBOX);

    this._createAnimations();

    this.state.addChild(this.sprite);
  }

  update() {
    if (this.plannedPos) {
      this.posX = this.plannedPos.x;
      this.posY = this.plannedPos.y;
      this.plannedPos = null;
    }
  }

  planPosition(x, y) {
    this.plannedPos = {
      x: x,
      y: y
    };
  }

  get posX() {
    return this.sprite.x + this.sprite.transform.anchorPointX;
  }

  set posX(x) {
    this.sprite.x = x - this.sprite.transform.anchorPointX;
  }

  get posY() {
    return this.sprite.y + this.SPRITE_SIZE;
  }

  set posY(y) {
    this.sprite.y = y - this.SPRITE_SIZE;
  }

  get bbox() {
    return this.sprite.physics.box;
  }

  playAnimation(name) {
    this.sprite.animation.play(name);
  }

  playAnimationIfNotPlaying(name) {
    if (this.currentAnimation.name != name) {
      this.playAnimation(name);
    }
  }

  get currentAnimation() {
    return this.sprite.animation.currentAnimation;
  }

  get velocityX() {
    return this.sprite.physics.velocity.x;
  }

  set velocityX(vx) {
    this.sprite.physics.velocity.x = vx;
  }

  get velocityY() {
    return this.sprite.physics.velocity.y;
  }

  set velocityY(vy) {
    this.sprite.physics.velocity.y = vy;
  }

  get accelerationX() {
    return this.sprite.physics.acceleration.x;
  }

  set accelerationX(ax) {
    this.sprite.physics.acceleration.x = ax;
  }

  get accelerationY() {
    return this.sprite.physics.acceleration.y;
  }

  set accelerationY(ay) {
    this.sprite.physics.acceleration.y = ay;
  }

  get direction() {
    return this.dir;
  }

  set direction(dir) {
    this.dir = dir;

    if (dir == this.DEFAULT_DIR) {
      this.sprite.scaleX = 1;
    } else {
      this.sprite.scaleX = -1;
    }
  }

  isTouching(dir) {
    return this.sprite.physics.isTouching(dir);
  }

  destroy() {
    this.state.removeChild(this.sprite);
  } // Debug


  drawBBoxOn(drawContext) {
    this.sprite.box.draw(drawContext);
  } // Internal


  _addAnimation(name, frames, delay, loop) {
    let realFrames = frames;

    if (frames.hasOwnProperty("from") && frames.hasOwnProperty("to")) {
      realFrames = [];

      for (let i = frames.from; i <= frames.to; ++i) {
        realFrames.push(i);
      }
    }

    this.sprite.animation.add(name, realFrames, delay, loop);
  } // OVERRIDE


  _createAnimations() {}

}



/***/ }),

/***/ "./js/consts.js":
/*!**********************!*\
  !*** ./js/consts.js ***!
  \**********************/
/*! exports provided: LEFT, RIGHT, UP, DOWN */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LEFT", function() { return LEFT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RIGHT", function() { return RIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UP", function() { return UP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOWN", function() { return DOWN; });


const LEFT = Kiwi.Components.ArcadePhysics.LEFT;
const RIGHT = Kiwi.Components.ArcadePhysics.RIGHT;
const UP = Kiwi.Components.ArcadePhysics.UP;
const DOWN = Kiwi.Components.ArcadePhysics.DOWN;


/***/ }),

/***/ "./js/game_config.js":
/*!***************************!*\
  !*** ./js/game_config.js ***!
  \***************************/
/*! exports provided: TILE_SIZE, GRAVITY, DEBUG */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TILE_SIZE", function() { return TILE_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GRAVITY", function() { return GRAVITY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEBUG", function() { return DEBUG; });


const TILE_SIZE = 48;
const DEBUG = false;
const GRAVITY = 7;


/***/ }),

/***/ "./js/item_factory.js":
/*!****************************!*\
  !*** ./js/item_factory.js ***!
  \****************************/
/*! exports provided: ItemsFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemsFactory", function() { return ItemsFactory; });


class ItemsFactory {
  constructor(state) {
    this.state = state;
    this.classes = {};
  }

  register(name, itemClass) {
    this.classes[name] = itemClass;
  }

  createItemFromObject(objdata) {
    if (this.classes.hasOwnProperty(objdata.type)) {
      let obj = new this.classes[objdata.type](this.state);
      obj.planPosition(objdata.x, objdata.y);
      return obj;
    }

    return null;
  }

}



/***/ }),

/***/ "./js/items.js":
/*!*********************!*\
  !*** ./js/items.js ***!
  \*********************/
/*! exports provided: TvItem, BioreactorItem, CrioItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TvItem", function() { return TvItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BioreactorItem", function() { return BioreactorItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CrioItem", function() { return CrioItem; });
/* harmony import */ var _carry_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./carry_item */ "./js/carry_item.js");
/* harmony import */ var _character__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./character */ "./js/character.js");





class TvItem extends _carry_item__WEBPACK_IMPORTED_MODULE_0__["CarryItem"] {
  constructor(state) {
    super(state);
    this.HITBOX = new Kiwi.Geom.Rectangle(0, 10, 62, 54);
    this.SPRITE_FILE = "assets/tv.png";
    this.NAME = "tv";
    this.SPRITE_SIZE = 64;
  }

  _createAnimations() {
    this._addAnimation("idle", [0], 0.1, false);

    this.playAnimation("idle");
  }

  preload() {}

}

class CrioItem extends _character__WEBPACK_IMPORTED_MODULE_1__["Character"] {
  constructor(state) {
    super(state);
    this.SPRITE_SIZE = 128;
    this.HITBOX = new Kiwi.Geom.Rectangle(25, 26, 85, 102);
    this.SPRITE_FILE = "assets/crio.png";
    this.NAME = "crio";
  }

  preload() {}

  _createAnimations() {
    this._addAnimation("full", [0], 0.1, false);

    this._addAnimation("empty", [1], 0.1, false);

    this.playAnimation("full");
  }

}

class ColonistItem extends _character__WEBPACK_IMPORTED_MODULE_1__["Character"] {
  constructor(state) {
    super(state);
    this.SPRITE_SIZE = 64;
    this.HITBOX = new Kiwi.Geom.Rectangle(4, 24, 56, 40);
    this.NAME = "colonist";
    this.SPRITE_FILE = "";
  }

  preload() {}

  _createAnimations() {
    this._addAnimation("idle", [0], 0.1, false);

    this.playAnimation("idle");
  }

}

class BioreactorItem extends _character__WEBPACK_IMPORTED_MODULE_1__["Character"] {
  constructor(state) {
    super(state);
    this.NAME = "br";
    this.SPRITE_SIZE = 64;
    this.HITBOX = new Kiwi.Geom.Rectangle(0, 14, 64, 50);
  }

  _createAnimations() {
    this._addAnimation("idle", [0], 0.1, false);

    this.playAnimation("idle");
  }

  create() {
    super.create();
  }

  update() {
    super.update();
    let hitbox = this.sprite.physics.box.worldHitbox;

    for (let i = 0; i < this.state.items.length; ++i) {
      let itm = this.state.items[i];

      if (itm.NAME == "colonist" && itm.flying) {
        let itmPoint = new Kiwi.Geom.Point(itm.posX, itm.posY);

        if (hitbox.containsPoint(itmPoint)) {
          itm.destroy();
          this.state.items.splice(i, 1);
          break;
        }
      }
    }
  }

  preload() {}

}



/***/ }),

/***/ "./js/level_state.js":
/*!***************************!*\
  !*** ./js/level_state.js ***!
  \***************************/
/*! exports provided: LevelState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LevelState", function() { return LevelState; });
/* harmony import */ var _game_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_config */ "./js/game_config.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./js/player.js");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./consts */ "./js/consts.js");
/* harmony import */ var _item_factory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./item_factory */ "./js/item_factory.js");
/* harmony import */ var _items__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./items */ "./js/items.js");








function readObjectsFromJSONFile(state, fileid) {
  const datajson = state.data[fileid].data;
  const data = JSON.parse(datajson); // Look for objects layers

  let result = [];

  for (let i = 0; i < data.layers.length; ++i) {
    const layer = data.layers[i];

    if (layer.hasOwnProperty("objects")) {
      for (let j = 0; j < layer.objects.length; ++j) {
        result.push(layer.objects[j]);
      }
    }
  }

  return result;
}

const LevelState = function (levelId) {
  let dbg = false;
  let state = new Kiwi.State("level_" + levelId);
  let player = new _player__WEBPACK_IMPORTED_MODULE_1__["Player"](state);
  let factory = new _item_factory__WEBPACK_IMPORTED_MODULE_3__["ItemsFactory"](state);
  factory.register("tv", _items__WEBPACK_IMPORTED_MODULE_4__["TvItem"]);
  factory.register("bioreactor", _items__WEBPACK_IMPORTED_MODULE_4__["BioreactorItem"]);

  state.preload = function () {
    //Kiwi.State.prototype.preload.call(this)
    const jsonfile = "levels/level_" + levelId + ".json";
    this.addJSON("tilemap", jsonfile);
    this.addSpriteSheet("tiles", "levels/tileset.png", _game_config__WEBPACK_IMPORTED_MODULE_0__["TILE_SIZE"], _game_config__WEBPACK_IMPORTED_MODULE_0__["TILE_SIZE"]);
    player.preload();
    this.addSpriteSheet("tvSprite", "assets/tv.png", 64, 64);
    this.addSpriteSheet("bioreactorSprite", "assets/bioreactor.png", 64, 64);
  };

  state.create = function () {
    //Kiwi.State.prototype.create.call(this)
    this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this, "tilemap", this.textures.tiles);

    for (let i = 0; i < this.tilemap.layers.length; ++i) {
      this.addChild(this.tilemap.layers[i]);
    }

    this.physLayer = this.tilemap.layers[this.tilemap.layers.length - 1];
    console.log("Tile types N: ", this.tilemap.tileTypes.length);

    for (var i = 1; i < this.tilemap.tileTypes.length; i++) {
      //if (this.tilemap.tileTypes[i].properties["type"] == "solid") {
      this.tilemap.tileTypes[i].allowCollisions = Kiwi.Components.ArcadePhysics.ANY; //}
    }

    player.create();
    const objects = readObjectsFromJSONFile(this, "tilemap");
    state.items = [];

    for (let obj of objects) {
      if (obj.type == "player") {
        player.posX = obj.x;
        player.posY = obj.y;
      } else {
        let itm = factory.createItemFromObject(obj);

        if (itm) {
          itm.create();
          this.items.push(itm);
        }
      }
    }

    if (state.items.length > 0) {
      state.swapChildren(player.sprite, state.items[state.items.length - 1].sprite);
    }
  };

  state.update = function () {
    Kiwi.State.prototype.update.call(this);

    if (_game_config__WEBPACK_IMPORTED_MODULE_0__["DEBUG"]) {
      if (!dbg && this.game.stage) {
        dbg = true;
        this.game.stage.createDebugCanvas();
      }
    }

    this.physLayer.physics.overlapsTiles(player.sprite, true);

    for (let itm of this.items) {
      this.physLayer.physics.overlapsTiles(itm.sprite, true);
    }

    if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.LEFT)) {
      player.go(_consts__WEBPACK_IMPORTED_MODULE_2__["LEFT"]);
    } else if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.RIGHT)) {
      player.go(_consts__WEBPACK_IMPORTED_MODULE_2__["RIGHT"]);
    } else {
      player.stop();
    }

    if (player.isTouching(_consts__WEBPACK_IMPORTED_MODULE_2__["DOWN"])) {
      //Does the player want to up?
      if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.UP)) {
        player.jump();
      }

      if (this.game.input.keyboard.justPressed(Kiwi.Input.Keycodes.A)) {
        if (!player.item) {
          for (let itm of this.items) {
            try {
              if (itm.canBeCarried(player)) {
                player.takeItem(itm);
                break;
              }
            } catch (e) {}
          }
        }
      } else if (this.game.input.keyboard.justPressed(Kiwi.Input.Keycodes.S)) {
        if (player.item) {
          player.throwItem();
        }
      }
    }

    player.update();

    for (let itm of this.items) {
      if (itm != player.item) {
        itm.update();
      }
    }

    if (_game_config__WEBPACK_IMPORTED_MODULE_0__["DEBUG"]) {
      this.game.stage.clearDebugCanvas();
      player.drawBBoxOn(this.game.stage.dctx);

      for (let itm of this.items) {
        itm.drawBBoxOn(this.game.stage.dctx);
      }
    }
  };

  return state;
};



/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _level_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./level_state */ "./js/level_state.js");



var state = new Kiwi.State("Level");

state.preload = function () {
  this.addJSON('tilemap', 'levels/test.json');
  this.addSpriteSheet('tiles', 'levels/tileset.png', 48, 48);
};

state.create = function () {
  this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this, 'tilemap', this.textures.tiles);
  this.addChild(this.tilemap.layers[0]);
};

state = Object(_level_state__WEBPACK_IMPORTED_MODULE_0__["LevelState"])("0");
const game = new Kiwi.Game(null, "The Game", state, {
  scaleType: Kiwi.Stage.SCALE_NONE
});

/***/ }),

/***/ "./js/player.js":
/*!**********************!*\
  !*** ./js/player.js ***!
  \**********************/
/*! exports provided: Player */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return Player; });
/* harmony import */ var _character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./character */ "./js/character.js");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./consts */ "./js/consts.js");
/* harmony import */ var _game_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game_config */ "./js/game_config.js");






class Player extends _character__WEBPACK_IMPORTED_MODULE_0__["Character"] {
  constructor(state) {
    super(state);
    this.HITBOX = new Kiwi.Geom.Rectangle(22, 48, 50, 80);
    this.SPRITE_FILE = "assets/elon_maks.png";
    this.NAME = "player";
    this.item = null;
  }

  _createAnimations() {
    this._addAnimation("idle", [0], 0.1, false);

    this._addAnimation("jump_start", {
      from: 24,
      to: 26
    }, 0.05, false);

    this._addAnimation("jump_fly", {
      from: 27,
      to: 32
    }, 0.05, true);

    this._addAnimation("jump_end", {
      from: 33,
      to: 35
    }, 0.05, true);

    this._addAnimation("run", {
      from: 12,
      to: 19
    }, 0.05, true);

    this._addAnimation("carry_idle", [36], 0.1, false);

    this._addAnimation("carry", {
      from: 36,
      to: 43
    }, 0.05, true);

    this._addAnimation("carry_jump_start", [40], 0.1, false);

    this._addAnimation("carry_jump_fly", [43], 0.1, false);

    this.playAnimation("idle");
  }

  update() {
    if (this.isTouching(_consts__WEBPACK_IMPORTED_MODULE_1__["DOWN"])) {
      if (this.velocityY >= 0) {
        if (this.velocityX == 0) {
          if (this.item) {
            this.playAnimation('carry_idle');
          } else {
            this.playAnimation('idle');
          }
        } else {
          if (this.item) {
            this.playAnimationIfNotPlaying("carry");
          } else {
            this.playAnimationIfNotPlaying("run");
          }
        }
      }
    } else {
      if (this.currentAnimation.name != "jump_start" && this.currentAnimation.name != "carry_jump_start" || !this.currentAnimation.isPlaying) {
        if (this.item) {
          this.playAnimationIfNotPlaying("carry_jump_fly");
        } else {
          this.playAnimationIfNotPlaying("jump_fly");
        }
      }
    }

    if (this.item) {
      this.item.posX = this.posX;
      this.item.posY = this.posY - this.bbox.hitbox.height;
    }
  }

  jump() {
    this.velocityY = -30;

    if (this.item) {
      this.playAnimationIfNotPlaying("carry_jump_start");
    } else {
      this.playAnimationIfNotPlaying("jump_start");
    }
  }

  go(dir) {
    this.direction = dir;
    let vel = 0;

    if (dir == _consts__WEBPACK_IMPORTED_MODULE_1__["LEFT"]) {
      vel = -15;
    } else if (dir == _consts__WEBPACK_IMPORTED_MODULE_1__["RIGHT"]) {
      vel = 15;
    }

    this.velocityX = vel;
  }

  stop() {
    this.velocityX = 0;
  }

  takeItem(item) {
    if (!this.item) {
      if (!item) {
        this.item = item;
      } else if (item.canBeCarried(this)) {
        this.item = item;
        this.item.accelerationY = 0;
        this.item.posX = this.posX;
        this.item.posY = this.posY - this.bbox.hitbox.height;
      }
    }
  }

  throwItem() {
    if (this.item) {
      this.item.velocityY = -40;

      if (this.direction == _consts__WEBPACK_IMPORTED_MODULE_1__["RIGHT"]) {
        this.item.velocityX = 40;
      } else {
        this.item.velocityX = -40;
      }

      this.item.accelerationY = _game_config__WEBPACK_IMPORTED_MODULE_2__["GRAVITY"];
      this.item.flying = true;
      this.item = null;
    }
  }

}
/*

function PlayerSprite(state, texture, initx, inity) {
    Kiwi.GameObjects.Sprite.call(this, state, texture, initx, inity)
    let box = new Kiwi.Geom.Rectangle(9, 40, 70, 88)
    this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box))
    this.physics.box.hitbox = box
    this.physics.acceleration.y = 7
    this.transform.anchorPointX = 44
    this.transform.anchorPointY = 84

    this.update = function() {
        Kiwi.GameObjects.Sprite.prototype.update.call(this)
        this.physics.update()
    }
}

Kiwi.extend(PlayerSprite, Kiwi.GameObjects.Sprite)

class Player {
    constructor(state) {
        this.state = state
        this.initialized = false
        this.direction = 0 // 0 - right, 1 - left
        this.sprite_size = 128;
    }

    preload() {
        this.state.addSpriteSheet("playerSprite", "assets/elon_maks.png", this.sprite_size, this.sprite_size)
    }

    create() {
        this.sprite = new PlayerSprite(this.state, this.state.textures.playerSprite, 3 * 48, 0)
        this.sprite.animation.add("idle", [0], 0.1, false)
        this.sprite.animation.add("run", [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35], 0.05, true)
        this.sprite.animation.add("jump", [12, 13, 14, 15, 16, 17, 18, 19], 0.05, true)
        this.sprite.animation.add("carry", [36, 37, 38, 39, 40, 41, 42, 43], 0.05, true)
        this.sprite.animation.play("idle")
        this.state.addChild(this.sprite)
        this.initialized = true
    }

    moveTo(x, y) {
        let realx = x - this.sprite.anchorPointX
        let realy = y - this.sprite_size
        this.sprite.x = realx
        this.sprite.y = realy
    }
}
*/




/***/ })

/******/ });
//# sourceMappingURL=main.bundle.js.map