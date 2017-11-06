import {Easing} from './Easing';
import {Tween} from './Tween';
//import TweenPath from './TweenPath';
import {TweenGroup} from './TweenGroup'
import {TweenSequence} from './TweenSequence'
import {TweenManager} from './TweenManager';

//extend pixi graphics to draw tweenPaths
/*PIXI.Graphics.prototype.drawPath = function (path) {
    path.parsePoints();
    this.drawShape(path.polygon);
    return this;
}*/

/**
 * @namespace PIXI.tween
 * @type {{TweenManager: TweenManager; Tween: Tween; Easing: Easing}}
 */

const exported = {
    Easing: Easing,
    Tween: Tween,
    TweenGroup: TweenGroup,
    TweenSequence: TweenSequence,
    TweenManager: TweenManager,
    //TweenPath: TweenPath
};

declare module PIXI {
    var tween: typeof exported
    var tweenManager: TweenManager
}

Object.assign(PIXI, {
    tweenManager: new TweenManager(),
    tween: exported
})
console.log(PIXI)

/*namespace PIXI {

    export let tweenManager: TweenManager

    if (!tweenManager) {
        tweenManager = new TweenManager();
        tween = tween;
    }
}*/

export default exported;
