module pixi_tween {

    const DefaultProperties: TweenGroup.Properties = {
        repeat: 0
    }

    export class TweenGroup {
        private readonly manager: TweenManager
        private readonly tweens: Tween[] = []
        private props?: TweenGroup.Properties

        constructor(manager: TweenManager, props: TweenGroup.Properties = DefaultProperties) {
            this.manager = manager
            this.props = props
        }

        add(target: PIXI.DisplayObject, props: Tween.Properties | Tween.Properties[]) {
            const merged = Tween.Properties.merge(props)
            merged.expire = this.props.repeat == 0
            const tween = this.manager.add(new Tween(target, merged))
            this.tweens.push(tween)

            return tween
        }

        on(event: TweenGroup.Event, fn: Function) {
            let filter
            if (event == 'start') {
                filter = (prev: Tween, current: Tween) => {
                    return prev.delay < current.delay ? prev : current
                }
            } else {
                filter = (prev: Tween, current: Tween) => {
                    return prev.endTime > current.endTime ? prev : current
                }
            }
            this.tweens.reduce(filter).on(event.toString(), fn)
        }

        promise(event: TweenGroup.Event): Promise<any> {
            return new Promise((resolve) => {
                this.on(event, resolve)
            })
        }

        start(): TweenGroup {
            if (this.props.repeat) {
                let count = 0
                this.on('end', () => {
                    if (count++ < this.props.repeat) {
                        this.tweens.forEach((tween, index) => {
                            tween.reset()
                            tween.start()
                        })
                    }
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
        export type Event = 'start' | 'end'

        export interface Properties {
            repeat: number
        }
    }
}