"use strict"

class ItemsFactory
{
    constructor(state) {
        this.state = state
        this.classes = {}
    }

    register(name, itemClass) {
        this.classes[name] = itemClass
    }

    createItemFromObject(objdata) {
        if (this.classes.hasOwnProperty(objdata.type)) {
            let obj = new this.classes[objdata.type](this.state)
            obj.planPosition(objdata.x, objdata.y)
            return obj
        }
        return null
    }
}

export {ItemsFactory}