
import {Tween} from './Tween'
import {TweenManager} from './TweenManager'

export class TweenSequence {

    private manager: TweenManager
    private tweens: Tween[] = []

    constructor(manager: TweenManager) {
        this.manager = manager
    }

    add(target: PIXI.DisplayObject, props: Tween.PropertyList) {
        const tween = Tween.create(target, props)
        this.tweens.push(tween)

        return tween
    }

    on(event: TweenSequence.Event, callback: Function) {
        const position = event == "start" ? 0 : this.tweens.length - 1
        this.tweens[position].on(event, callback)
    }

    promise(event: TweenSequence.Event): Promise<void> {
        return new Promise((resolve) => {
            this.on(event, resolve)
        })
    }

    start(): TweenSequence {
        let index = 0;
        this.manager.run(this.tweens[index]).then(() => {
            index++
            if (index < this.tweens.length) {
                return this.manager.run(this.tweens[index])
            }
        })

        return this
    }
}

export namespace TweenSequence {
    export type Event = 'start' | 'end'
    export const Events = {
        start: "start",
        end: "end"
    }
}