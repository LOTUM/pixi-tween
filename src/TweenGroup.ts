
import {Tween} from './Tween'
import {TweenManager} from './TweenManager'

export class TweenGroup {

    public readonly loop: boolean
    private readonly manager: TweenManager
    private readonly tweens: Tween[] = []

    constructor(manager: TweenManager, loop: boolean = false) {
        this.manager = manager
        this.loop = loop
    }

    add(target: PIXI.DisplayObject, props: Tween.PropertyList) {
        /*const defaults = { start: false, expire: !this.loop }
        if (Array.isArray(props)) {
            (<TweenParameters[]>props).push(defaults)
        } else {
            props = [props, defaults]
        }*/

        const tween = this.manager.create(target, props)
        this.tweens.push(tween)

        return tween
    }

    on(event: TweenGroup.Event, callback: Function) {
        let filter
        if (event == TweenGroup.Event.start) {
            filter = (prev: Tween, current: Tween) => {
                return prev.delay < current.delay ? prev : current
            }
        } else {
            filter = (prev: Tween, current: Tween) => {
                return prev.endTime > current.endTime ? prev : current
            }
        }
        this.tweens.reduce(filter).on(event, callback)
    }

    promise(event: TweenGroup.Event): Promise<void> {
        return new Promise((resolve) => {
            this.on(event, resolve)
        })
    }

    start(): TweenGroup {
        if (this.loop) {
            this.on(TweenGroup.Event.end, () => {
                this.tweens.forEach((tween, index) => {
                    tween.reset()
                    tween.start()
                })
            })
        }

        this.tweens.forEach((tween) => {
            if (!tween.manager) {
                this.manager.add(tween)
            }
            tween.start()
        })

        return this
    }

    stop() {
        this.tweens.forEach(tween => tween.stop())
    }

    remove() {
        this.tweens.forEach((tween) => {
            tween.remove()
        })
    }
}

export namespace TweenGroup {
    export enum Event {
        start = "start",
        end = "end"
    }
}