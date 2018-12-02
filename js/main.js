"use strict"

import {LevelState} from "./level_state"

var state = new Kiwi.State("Level")

state.preload = function() {
    this.addJSON('tilemap', 'levels/test.json');
    this.addSpriteSheet('tiles', 'levels/tileset.png', 48, 48);
}

state.create = function() {
	this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this, 'tilemap', this.textures.tiles);
	this.addChild(this.tilemap.layers[0]);
}

state = LevelState("0")

const game = new Kiwi.Game(null, "The Game", state, {scaleType: Kiwi.Stage.SCALE_NONE})

