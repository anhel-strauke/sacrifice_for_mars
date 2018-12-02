"use strict"

import * as Consts from "./consts"
import {Character} from "./character"

class CarryItem extends Character
{
    constructor(state) {
        super(state)
        this.enabled = true
        this.flying = false
    }

    canBeCarried(player) {
        if (this.enabled) {
            let effectivePlayerY = player.posY - 5
            let effectivePlayerPoint = new Kiwi.Geom.Point(player.posX, effectivePlayerY)
            if (this.sprite.physics.box.worldHitbox.containsPoint(effectivePlayerPoint)) {
                return true
            }
        }
        return false
    }

    update() {
        super.update()
        if (this.isTouching(Consts.DOWN)) {
            this.velocityX = 0
            this.velocityY = 0
        }
        if (this.velocityY == 0) {
            this.flying = false
        }
    }
}

export {CarryItem}