"use strict"

import {CarryItem} from "./carry_item"
import {Character} from "./character"

class TvItem extends CarryItem {
    constructor(state) {
        super(state)
        this.HITBOX = new Kiwi.Geom.Rectangle(0, 10, 62, 54)
        this.SPRITE_FILE = "assets/tv.png"
        this.NAME = "tv"
        this.SPRITE_SIZE = 64
    }

    _createAnimations() {
        this._addAnimation("idle", [0], 0.1, false)
        this.playAnimation("idle")
    }

    preload() {
    }
}


class CrioItem extends Character
{
    constructor(state) {
        super(state)
        this.SPRITE_SIZE = 128
        this.HITBOX = new Kiwi.Geom.Rectangle(25, 26, 85, 102)
        this.SPRITE_FILE = "assets/crio.png"
        this.NAME = "crio"
    }

    preload() {
    }

    _createAnimations() {
        this._addAnimation("full", [0], 0.1, false)
        this._addAnimation("empty", [1], 0.1, false)
        this.playAnimation("full")
    }
}


class ColonistItem extends Character 
{
    constructor(state) {
        super(state)
        this.SPRITE_SIZE = 64
        this.HITBOX = new Kiwi.Geom.Rectangle(4, 24, 56, 40)
        this.NAME = "colonist"
        this.SPRITE_FILE = ""
    }

    preload() {
    }

    _createAnimations() {
        this._addAnimation("idle", [0], 0.1, false)
        this.playAnimation("idle")    
    }
}


class BioreactorItem extends Character 
{
    constructor(state) {
        super(state)
        this.NAME = "br"
        this.SPRITE_SIZE = 64
        this.HITBOX = new Kiwi.Geom.Rectangle(0, 14, 64, 50)
    }

    _createAnimations() {
        this._addAnimation("idle", [0], 0.1, false)
        this.playAnimation("idle")
    }

    create() {
        super.create()
    }

    update() {
        super.update()
        let hitbox = this.sprite.physics.box.worldHitbox
        for (let i = 0; i < this.state.items.length; ++i) {
            let itm = this.state.items[i]
            if (itm.NAME == "colonist" && itm.flying) {
                let itmPoint = new Kiwi.Geom.Point(itm.posX, itm.posY)
                if (hitbox.containsPoint(itmPoint)) {
                    itm.destroy()
                    this.state.items.splice(i, 1)
                    break
                }
            }
        }
    }

    preload() {
    }
}

export {TvItem, BioreactorItem, CrioItem}