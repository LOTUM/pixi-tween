import * as PIXI from 'pixi.js';
import Tween from './Tween';

export default class TweenManager extends PIXI.utils.EventEmitter {

    constructor() {
        super();

        this.tweens = [];
        this._tweensToDelete = [];
        this._interactive = false
    }

    update(deltaTime) {
        for (let i = 0; i < this.tweens.length; i++) {
            let tween = this.tweens[i];
            if (tween.active) {
                tween.update(deltaTime);
                if (tween.isEnded && tween.expire) {
                    tween.remove();
                }
            }
        }

        if (this._tweensToDelete.length) {
            for (let i = 0; i < this._tweensToDelete.length; i++) {
                this._remove(this._tweensToDelete[i]);
            }
            this._tweensToDelete.length = 0;
        }
    }

    getTweensForTarget(target) {
        let tweens = [];
        for (let i = 0; i < this.tweens.length; i++) {
            if (this.tweens[i].target === target) {
                tweens.push(this.tweens[i]);
            }
        }

        return tweens;
    }

    createTween(target) {
        return new Tween(target, this);
    }

    addTween(tween) {
        tween.manager = this;
        this.tweens.push(tween);
        this._toggle(true)
    }

    removeTween(tween) {
        this._tweensToDelete.push(tween);
    }

    _remove(tween) {
        let index = this.tweens.indexOf(tween);
        if (index !== -1) {
            this.tweens.splice(index, 1);
        }

        if (this.tweens.length === 0) {
            this._toggle(false);
        }
    }

    _toggle(interactive) {
        if (this._interactive !== interactive) {
            console.log("TweenManager: toggle interactive", interactive);
            this._interactive = interactive;
            this.emit("interactive", interactive);
        }
    }
}
