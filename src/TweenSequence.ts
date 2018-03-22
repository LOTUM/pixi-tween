module pixi_tween {

    export class TweenSequence {

        private manager: TweenManager
        private tweens: Tween[] = []

        constructor(manager: TweenManager) {
            this.manager = manager
        }

        add(target: PIXI.DisplayObject, props: Tween.Properties | Tween.Properties[]) {
            const tween = this.manager.create(target, props)
            if (this.tweens.length == 0) {
                tween.applyFrom()
            }
            this.tweens.push(tween)

            return tween
        }

        on(event: TweenSequence.Event, callback: Function): this {
            const position = event == 'start' ? 0 : this.tweens.length - 1
            this.tweens[position].on(event, callback)
            return this
        }

        promise(event: TweenSequence.Event): Promise<any> {
            return new Promise((resolve) => {
                this.on(event, resolve)
            })
        }

        start(): TweenSequence {
            let promise = Promise.resolve()
            this.tweens.forEach(value => {
                promise = promise.then(() => {
                    return value.start().promise('end')
                })
            })

            return this
        }
    }

    export namespace TweenSequence {
        export type Event = 'start' | 'end'
    }
}