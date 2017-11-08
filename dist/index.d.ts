/// <reference types="pixi.js" />
declare module PIXI.tween {
    namespace Easing {
        type Function = (t: number) => number;
        function linear(): Function;
        function inQuad(): Function;
        function outQuad(): Function;
        function inOutQuad(): Function;
        function inCubic(): Function;
        function outCubic(): Function;
        function inOutCubic(): Function;
        function inQuart(): Function;
        function outQuart(): Function;
        function inOutQuart(): Function;
        function inQuint(): Function;
        function outQuint(): Function;
        function inOutQuint(): Function;
        function inSine(): Function;
        function outSine(): Function;
        function inOutSine(): Function;
        function inExpo(): Function;
        function outExpo(): Function;
        function inOutExpo(): Function;
        function inCirc(): Function;
        function outCirc(): Function;
        function inOutCirc(): Function;
        function inElastic(a?: number, p?: number): Function;
        function outElastic(a?: number, p?: number): Function;
        function inOutElastic(a?: number, p?: number): Function;
        function inBack(v?: number): Function;
        function outBack(v?: number): Function;
        function inOutBack(v?: number): Function;
        function inBounce(): Function;
        function outBounce(): Function;
        function inOutBounce(): Function;
    }
}
declare module PIXI.tween {
    interface Interpolator<T> {
        interpolate(fraction: number): T;
    }
    class ValueInterpolator implements Interpolator<number> {
        private start;
        private range;
        constructor(startValue: number, endValue: number);
        interpolate(fraction: number): number;
    }
    class PointInterpolator implements Interpolator<PIXI.Point> {
        private x;
        private y;
        constructor(startPoint: number | PIXI.Point, endPoint: number | PIXI.Point);
        interpolate(fraction: number): PIXI.Point;
    }
    class ColorInterpolator implements Interpolator<number> {
        private r;
        private g;
        private b;
        constructor(start: number, end: number);
        interpolate(fraction: number): number;
    }
}
declare module PIXI.tween {
    interface TweenableProperties {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        rotation?: number;
        scale?: number | PIXI.PointLike;
        skew?: PIXI.PointLike;
        tint?: number;
        alpha?: number;
    }
    class Tween extends PIXI.utils.EventEmitter {
        readonly target: PIXI.DisplayObject;
        manager: TweenManager;
        active: boolean;
        duration: number;
        delay: number;
        easing: Easing.Function;
        expire: boolean;
        repeat: number;
        yoyo: boolean;
        private started;
        ended: boolean;
        private startProps;
        private endProps;
        private delayTime;
        private elapsedTime;
        private repeatCount;
        private reversed;
        private interpolators;
        static create(target: PIXI.DisplayObject, props: Tween.Properties | Tween.Properties[]): Tween;
        static animate(node: PIXI.DisplayObject, params: Tween.Properties | Tween.Properties[]): Promise<any>;
        constructor(target: PIXI.DisplayObject, props: Tween.Properties);
        readonly endTime: number;
        promise(event: string): Promise<any>;
        start(): Tween;
        stop(): Tween;
        from(props: TweenableProperties): Tween;
        to(props: TweenableProperties): Tween;
        remove(): this;
        apply(props: Tween.Properties): Tween;
        clear(): Tween;
        reset(): Tween;
        update(deltaTime: number): void;
        private canUpdate();
        private parseData();
        private updateInterpolators();
        private updateProps(time);
    }
    namespace Tween {
        type Event = 'start' | 'stop' | 'end' | 'update' | 'repeat' | 'reversed';
        const Events: {
            start: string;
            stop: string;
            end: string;
            update: string;
            repeat: string;
            reversed: string;
        };
        interface Properties {
            active?: boolean;
            expire?: boolean;
            duration?: number;
            delay?: number;
            easing?: Easing.Function;
            repeat?: number;
            yoyo?: boolean;
            from?: TweenableProperties;
            to?: TweenableProperties;
        }
    }
}
declare function isObject(obj: any): boolean;
declare function isEqual(obj1: any, obj2: any): boolean;
declare function mergeProps(target: any, source: any): any;
declare function getProps(target: any, props: string[]): any;
declare module PIXI.tween {
    class TweenGroup {
        readonly loop: boolean;
        private readonly manager;
        private readonly tweens;
        constructor(manager: TweenManager, props?: TweenGroup.Properties);
        add(target: PIXI.DisplayObject, props: Tween.Properties | Tween.Properties[]): Tween;
        on(event: TweenGroup.Event, callback: Function): void;
        promise(event: TweenGroup.Event): Promise<any>;
        start(): TweenGroup;
        stop(): void;
        remove(): void;
    }
    namespace TweenGroup {
        type Event = 'start' | 'end';
        const Events: {
            start: string;
            end: string;
        };
        interface Properties {
            loop: boolean;
        }
    }
}
declare module PIXI.tween {
    class TweenManager extends PIXI.utils.EventEmitter {
        readonly tweens: Tween[];
        private readonly tweensToDelete;
        private interactive;
        constructor();
        attach(ticker: PIXI.ticker.Ticker): void;
        update(deltaTime: number): void;
        get(target: PIXI.DisplayObject): Tween[];
        group(props?: TweenGroup.Properties): TweenGroup;
        sequence(): TweenSequence;
        create(target: PIXI.DisplayObject, props: Tween.Properties | Tween.Properties[]): Tween;
        run(tween: Tween): Promise<any>;
        add(tween: Tween): Tween;
        remove(tween: Tween): void;
        private dump(tween);
        private toggle(interactive);
    }
    namespace TweenManager {
        type Event = 'interactive';
        const Events: {
            interactive: string;
        };
    }
}
declare module PIXI {
    let tweenManager: PIXI.tween.TweenManager;
}
declare module PIXI.tween {
    class TweenSequence {
        private manager;
        private tweens;
        constructor(manager: TweenManager);
        add(target: PIXI.DisplayObject, props: Tween.Properties | Tween.Properties[]): Tween;
        on(event: TweenSequence.Event, callback: Function): void;
        promise(event: TweenSequence.Event): Promise<any>;
        start(): TweenSequence;
    }
    namespace TweenSequence {
        type Event = 'start' | 'end';
        const Events: {
            start: string;
            end: string;
        };
    }
}
