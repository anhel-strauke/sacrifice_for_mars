"use strict"

import {Character} from "./character"

import * as Consts from "./consts"
import { GRAVITY } from "./game_config";

class Player extends Character 
{
    constructor(state) {
        super(state)
        this.HITBOX = new Kiwi.Geom.Rectangle(22, 48, 50, 80)
        this.SPRITE_FILE = "assets/elon_maks.png"
        this.NAME = "player"
        this.item = null
    }

    _createAnimations() {
        this._addAnimation("idle", [0], 0.1, false)
        this._addAnimation("jump_start", {from: 24, to: 26}, 0.05, false)
        this._addAnimation("jump_fly", {from: 27, to: 32}, 0.05, true)
        this._addAnimation("jump_end", {from: 33, to: 35}, 0.05, true)
        this._addAnimation("run", {from: 12, to: 19}, 0.05, true)
        this._addAnimation("carry_idle", [36], 0.1, false)
        this._addAnimation("carry", {from: 36, to: 43}, 0.05, true)
        this._addAnimation("carry_jump_start", [40], 0.1, false)
        this._addAnimation("carry_jump_fly", [43], 0.1, false)
        this.playAnimation("idle")
    }

    update() {
        if (this.isTouching(Consts.DOWN)) {
            if (this.velocityY >= 0) {
                if (this.velocityX == 0) {
                    if (this.item) {
                        this.playAnimation('carry_idle')
                    } else {
                        this.playAnimation('idle');
                    }
                } else {
                    if (this.item) {
                        this.playAnimationIfNotPlaying("carry")
                    } else {
                        this.playAnimationIfNotPlaying("run")
                    }
                }
            }
        } else {
            if ((this.currentAnimation.name != "jump_start" && this.currentAnimation.name != "carry_jump_start") 
                || !this.currentAnimation.isPlaying) {
                if (this.item) {
                    this.playAnimationIfNotPlaying("carry_jump_fly")
                } else {
                    this.playAnimationIfNotPlaying("jump_fly")
                }
            }
        }

        if (this.item) {
            this.item.posX = this.posX
            this.item.posY = this.posY - this.bbox.hitbox.height
        }
    }

    jump() {
        this.velocityY = -30
        if (this.item) {
            this.playAnimationIfNotPlaying("carry_jump_start")    
        } else {
            this.playAnimationIfNotPlaying("jump_start")
        }
    }

    go(dir) {
        this.direction = dir
        let vel = 0
        if (dir == Consts.LEFT) {
            vel = -15
        } else if (dir == Consts.RIGHT) {
            vel = 15
        }
        this.velocityX = vel
    }

    stop() {
        this.velocityX = 0
    }

    takeItem(item) {
        if (!this.item) {
            if (!item) {
                this.item = item
            } else if (item.canBeCarried(this)) {
                this.item = item
                this.item.accelerationY = 0
                this.item.posX = this.posX
                this.item.posY = this.posY - this.bbox.hitbox.height
            }
        }
    }

    throwItem() {
        if (this.item) {
            this.item.velocityY = -40
            if (this.direction == Consts.RIGHT) {
                this.item.velocityX = 40
            } else {
                this.item.velocityX = -40
            }
            this.item.accelerationY = GRAVITY
            this.item.flying = true
            this.item = null
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
export {Player}