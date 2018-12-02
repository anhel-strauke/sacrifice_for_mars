"use strict"

import * as Consts from "./consts"
import * as Conf from "./game_config"

function CharacterSprite(state, texture, hitbox, anchorx=null, anchory=null) {
    Kiwi.GameObjects.Sprite.call(this, state, texture, 0, 0)
    this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box))
    this.physics.box.hitbox = hitbox
    this.physics.acceleration.y = Conf.GRAVITY
    if (anchorx === null) {
        this.transform.anchorPointX = hitbox.x + hitbox.width / 2
    } else {
        this.transform.anchorPointX = anchorx
    }
    if (anchory === null) {
        this.transform.anchorPointY = hitbox.y + hitbox.height / 2
    } else {
        this.transform.anchorPointY = anchory
    }
}

CharacterSprite.prototype.update = function() {
    Kiwi.GameObjects.Sprite.prototype.update.call(this)
    this.physics.update()
}

Kiwi.extend(CharacterSprite, Kiwi.GameObjects.Sprite)


class Character
{
    constructor(state) {
        this.state = state
        this.dir = Consts.RIGHT
        this.DEFAULT_DIR = Consts.RIGHT
        this.SPRITE_SIZE = 128
        this.HITBOX = new Kiwi.Geom.Rectangle(0, 0, 128, 128)
        this.SPRITE_FILE = ""
        this.NAME = ""
        this.plannedPos = null
    }

    preload() {
        this.state.addSpriteSheet(this.NAME + "Sprite", this.SPRITE_FILE, 
                                  this.SPRITE_SIZE, this.SPRITE_SIZE)
    }

    create() {
        this.sprite = new CharacterSprite(this.state, this.state.textures[this.NAME + "Sprite"], this.HITBOX)
        this._createAnimations()
        this.state.addChild(this.sprite)
    }

    update() {
        if (this.plannedPos) {
            this.posX = this.plannedPos.x
            this.posY = this.plannedPos.y
            this.plannedPos = null
        }
    }

    planPosition(x, y) {
        this.plannedPos = {x: x, y: y}
    }

    get posX() {
        return this.sprite.x + this.sprite.transform.anchorPointX
    }

    set posX(x) {
        this.sprite.x = x - this.sprite.transform.anchorPointX
    }

    get posY() {
        return this.sprite.y + this.SPRITE_SIZE
    }

    set posY(y) {
        this.sprite.y = y - this.SPRITE_SIZE
    }

    get bbox() {
        return this.sprite.physics.box
    }

    playAnimation(name) {
        this.sprite.animation.play(name)
    }

    playAnimationIfNotPlaying(name) {
        if (this.currentAnimation.name != name) {
            this.playAnimation(name)
        }
    }

    get currentAnimation() {
        return this.sprite.animation.currentAnimation
    }

    get velocityX() {
        return this.sprite.physics.velocity.x
    }

    set velocityX(vx) {
        this.sprite.physics.velocity.x = vx
    }

    get velocityY() {
        return this.sprite.physics.velocity.y
    }

    set velocityY(vy) {
        this.sprite.physics.velocity.y = vy
    }

    get accelerationX() {
        return this.sprite.physics.acceleration.x
    }

    set accelerationX(ax) {
        this.sprite.physics.acceleration.x = ax
    }

    get accelerationY() {
        return this.sprite.physics.acceleration.y
    }

    set accelerationY(ay) {
        this.sprite.physics.acceleration.y = ay
    }

    get direction() {
        return this.dir
    }

    set direction(dir) {
        this.dir = dir
        if (dir == this.DEFAULT_DIR) {
            this.sprite.scaleX = 1
        } else {
            this.sprite.scaleX = -1
        }
    }

    isTouching(dir) {
        return this.sprite.physics.isTouching(dir)
    }

    destroy() {
        this.state.removeChild(this.sprite)
    }

    // Debug
    drawBBoxOn(drawContext) {
        this.sprite.box.draw(drawContext)
    }

    // Internal
    _addAnimation(name, frames, delay, loop) {
        let realFrames = frames
        if (frames.hasOwnProperty("from") && frames.hasOwnProperty("to")) {
            realFrames = []
            for (let i = frames.from; i <= frames.to; ++i) {
                realFrames.push(i)
            }
        }
        this.sprite.animation.add(name, realFrames, delay, loop)
    }

    // OVERRIDE
    _createAnimations() {

    }
}

export {Character}