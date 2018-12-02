"use strict"

import {TILE_SIZE, DEBUG} from "./game_config"
import {Player} from "./player"
import * as Consts from "./consts"
import {ItemsFactory} from "./item_factory"
import {TvItem, BioreactorItem} from "./items"

function readObjectsFromJSONFile(state, fileid) {
    const datajson = state.data[fileid].data
    const data = JSON.parse(datajson)
    // Look for objects layers
    let result = []
    for (let i = 0; i < data.layers.length; ++i) {
        const layer = data.layers[i]
        if (layer.hasOwnProperty("objects")) {
            for (let j = 0; j < layer.objects.length; ++j) {
                result.push(layer.objects[j])
            }
        }
    }
    return result;
}

const LevelState = function(levelId) {
    let dbg = false
    let state = new Kiwi.State("level_" + levelId)
    let player = new Player(state)

    let factory = new ItemsFactory(state)
    factory.register("tv", TvItem)
    factory.register("bioreactor", BioreactorItem)

    state.preload = function() {
        //Kiwi.State.prototype.preload.call(this)
        const jsonfile = "levels/level_" + levelId + ".json"
        this.addJSON("tilemap", jsonfile)
        this.addSpriteSheet("tiles", "levels/tileset.png", TILE_SIZE, TILE_SIZE)
        player.preload()
        this.addSpriteSheet("tvSprite", "assets/tv.png", 64, 64)
        this.addSpriteSheet("bioreactorSprite", "assets/bioreactor.png", 64, 64)
    }

    state.create = function() {
        //Kiwi.State.prototype.create.call(this)
        this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this, "tilemap", this.textures.tiles)
        for (let i = 0; i < this.tilemap.layers.length; ++i) {
            this.addChild(this.tilemap.layers[i])
        }
        this.physLayer = this.tilemap.layers[this.tilemap.layers.length - 1]
        console.log("Tile types N: ", this.tilemap.tileTypes.length)
        for(var i = 1; i < this.tilemap.tileTypes.length; i++) {
            //if (this.tilemap.tileTypes[i].properties["type"] == "solid") {
                this.tilemap.tileTypes[i].allowCollisions = Kiwi.Components.ArcadePhysics.ANY
            //}
        }
        player.create()
        const objects = readObjectsFromJSONFile(this, "tilemap")
        state.items = []
        for (let obj of objects) {
            if (obj.type == "player") {
                player.posX = obj.x
                player.posY = obj.y
            } else {
                let itm = factory.createItemFromObject(obj)
                if (itm) {
                    itm.create()
                    this.items.push(itm)
                }
            }
        }    
        if (state.items.length > 0) {
            state.swapChildren(player.sprite, state.items[state.items.length - 1].sprite)
        }    
    }

    state.update = function() {
        Kiwi.State.prototype.update.call(this)

        if (DEBUG) {
            if (!dbg && this.game.stage) {
                dbg = true
                this.game.stage.createDebugCanvas();
            }
        }
        this.physLayer.physics.overlapsTiles(player.sprite, true);
        for (let itm of this.items) {
            this.physLayer.physics.overlapsTiles(itm.sprite, true);
        }

        if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.LEFT)) {
	        player.go(Consts.LEFT)
	    } else if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.RIGHT)) {
	        player.go(Consts.RIGHT)
	    } else {
	        player.stop()
        }
        if (player.isTouching(Consts.DOWN)) {
	        //Does the player want to up?
	        if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.UP)) {
	            player.jump()
            }
            
            if (this.game.input.keyboard.justPressed(Kiwi.Input.Keycodes.A) ) {
                if (!player.item) {
                    for (let itm of this.items) {
                        try {
                            if (itm.canBeCarried(player)) {
                                player.takeItem(itm)
                                break
                            }
                        } catch (e) {

                        }
                    }
                }
            }  else if (this.game.input.keyboard.justPressed(Kiwi.Input.Keycodes.S)) {
                if (player.item) {
                    player.throwItem()
                }
            }
        }
        
        player.update()
        for (let itm of this.items) {
            if (itm != player.item) {
                itm.update()
            }
        }

        if (DEBUG) {
            this.game.stage.clearDebugCanvas()
            player.drawBBoxOn(this.game.stage.dctx)
            for (let itm of this.items) {
                itm.drawBBoxOn(this.game.stage.dctx)
            }
        }
    }

    return state
}

export {LevelState}