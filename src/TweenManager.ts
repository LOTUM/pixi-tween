
module pixi_tween {

    export class TweenManager extends PIXI.utils.EventEmitter {

        public readonly tweens: Tween[]
        private readonly tweensToDelete: Tween[]
        private interactive: boolean

        constructor() {
            super();

            this.tweens = [];
            this.tweensToDelete = [];
            this.interactive = false
        }


        on(event: string | symbol | TweenManager.Event, fn: Function, context?: any): this {
            return super.on(event, fn, context)
        }

        once(event: string | symbol | TweenManager.Event, fn: Function, context?: any): this {
            return super.once(event, fn, context)
        }

        attach(ticker: PIXI.ticker.Ticker) {
            ticker.add(() => {
                this.update(ticker.elapsedMS)
            });

            this.on('interactive', (interactive: boolean) => {
                if (interactive) {
                    ticker.start()
                } else {
                    ticker.stop()
                }
            })
        }

        update(deltaTime: number) {
            for (let i = 0; i < this.tweens.length; i++) {
                const tween = this.tweens[i];
                if (tween.active) {
                    tween.update(deltaTime);
                    if (tween.ended && tween.expire) {
                        tween.remove();
                    }
                }
            }

            if (this.tweensToDelete.length) {
                for (let i = 0; i < this.tweensToDelete.length; i++) {
                    this.dump(this.tweensToDelete[i]);
                }
                this.tweensToDelete.length = 0;
            }
        }

        get(target: PIXI.DisplayObject): Tween[] {
            let tweens = [];
            for (let i = 0; i < this.tweens.length; i++) {
                if (this.tweens[i].target === target) {
                    tweens.push(this.tweens[i]);
                }
            }

            return tweens;
        }

        group(props?: TweenGroup.Properties): TweenGroup {
            return new TweenGroup(this, props)
        }

        sequence(): TweenSequence {
            return new TweenSequence(this)
        }

        create(target: PIXI.DisplayObject, props: Tween.Properties | Tween.Properties[]) {
            return this.add(new Tween(target, Tween.Properties.merge(props)));
        }

        tween(target: PIXI.DisplayObject, props: Tween.Properties | Tween.Properties[]) {
            return this.create(target, props).applyFrom().start()
        }

        add(tween: Tween): Tween {
            tween.manager = this
            this.tweens.push(tween)
            //todo: improve interactive handling
            this.toggle(true)

            return tween
        }

        remove(tween: Tween) {
            this.tweensToDelete.push(tween);
        }

        private dump(tween: Tween) {
            let index = this.tweens.indexOf(tween);
            if (index !== -1) {
                this.tweens.splice(index, 1);
            }

            if (this.tweens.length === 0) {
                this.toggle(false);
            }
        }

        private toggle(interactive: boolean) {
            if (this.interactive !== interactive) {
                this.interactive = interactive;
                this.emit('interactive', interactive);
            }
        }
    }

    export namespace TweenManager {
        export type Event = 'interactive'
    }
}

declare module PIXI {
    //export let tween: typeof pixi_tween;
    export let tweenManager: pixi_tween.TweenManager
}

Object.assign(PIXI, {
    tween: pixi_tween,
    tweenManager: new pixi_tween.TweenManager()
})
