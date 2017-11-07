import * as PIXI from 'pixi.js'

import {Easing} from './Easing'
import {TweenManager} from './TweenManager'
import {ColorInterpolator, Interpolator, PointInterpolator, ValueInterpolator} from './Interpolator'

export interface TweenableProperties {
    x?: number
    y?: number
    width?: number
    height?: number
    rotation?: number
    scale?: number | PIXI.PointLike
    skew?: PIXI.PointLike
    tint?: number
    alpha?: number
}

const DefaultProperties: Tween.Properties = {
    active: false,
    expire: true,
    duration: 1000,
    delay: 0,
    easing: Easing.linear(),
    repeat: 0,
    yoyo: false
}

export class Tween extends PIXI.utils.EventEmitter {

    public readonly target: PIXI.DisplayObject
    public manager: TweenManager

    public active: boolean
    public duration: number
    public delay: number
    public easing: Easing.Function
    public expire: boolean
    public repeat: number
    public yoyo: boolean

    private started: boolean
    public ended: boolean

    private startProps: any
    private endProps: any
    private delayTime: number
    private elapsedTime: number
    private repeatCount: number
    private reversed: boolean

    private interpolators: { [prop: string]: Interpolator<any> }

    static create(target: PIXI.DisplayObject, props: Tween.Properties | Tween.Properties[]) {
        let merged: Tween.Properties = {...DefaultProperties}
        if (!Array.isArray(props)) {
            mergeProps(merged, props)
        } else {
            props.forEach((part) => {
                mergeProps(merged, part)
            })
        }

        return new Tween(target, merged)
    }

    static animate(node: PIXI.DisplayObject, params: Tween.Properties | Tween.Properties[]): Promise<any> {
        return Tween.create(node, params).promise(Tween.Events.end)
    }

    constructor(target: PIXI.DisplayObject, props: Tween.Properties) {
        super()

        this.target = target
        this.apply(props)
    }

    get endTime() {
        return this.delay + this.duration
    }

    promise(event: string): Promise<void> {
        return new Promise(resolve => {
            this.once(event, resolve)
        })
    }

    /*toString() {
        return "{" +
            "expire=" + this.expire + ", " +
            "ended=" + this.ended + ", " +
            "active=" + this.active + ", " +
            "target=" + this.target.constructor.name + ", " +
            "}"
    }*/

    start(): Tween {
        this.active = true
        return this
    }

    stop(): Tween {
        this.active = false
        this.emit('stop')
        return this
    }

    from(props: TweenableProperties): Tween {
        //console.log("Tween: set from", props);
        this.startProps = props
        return this
    }

    to(props: TweenableProperties): Tween {
        this.endProps = props
        return this
    }

    remove() {
        if (this.manager) {
            this.manager.remove(this)
            this.manager = undefined
        }
        return this
    }

    apply(props: Tween.Properties): Tween {
        //console.log('Tween: merged params', Array.isArray(params), merged)
        this.duration = props.duration
        this.delay = props.delay
        this.easing = props.easing
        this.repeat = props.repeat
        this.yoyo = props.yoyo
        this.expire = props.expire

        this.from(props.from)
        this.to(props.to)

        return this;
    }

    clear(): Tween {
        this.active = false
        this.duration = 0
        this.delay = 0
        this.easing = Easing.linear()
        this.expire = false
        this.repeat = 0
        this.yoyo = false
        this.started = false
        this.ended = false

        this.startProps = null
        this.endProps = null
        this.delayTime = 0
        this.elapsedTime = 0
        this.repeatCount = 0
        this.reversed = false

        /*this.path = null
        this.pathReverse = false
        this.pathFrom = 0
        this.pathTo = 0*/

        return this
    }

    reset(): Tween {
        this.elapsedTime = 0
        this.repeatCount = 0
        this.delayTime = 0

        this.started = false
        this.ended = false

        if (this.yoyo && this.reversed) {
            /*let _to = this._to
            let _from = this._from
            this._to = _from
            this._from = _to*/
            [this.startProps, this.endProps] = [this.endProps, this.startProps]
            this.reversed = false
        }

        //console.log
        //this.updateProps(0)
        return this
    }

    update(deltaTime: number) {
        if (!this.canUpdate() && (this.endProps/* || this.path*/)) {
            return
        }

        if (this.delay > this.delayTime) {
            this.delayTime += deltaTime
            return
        }

        if (!this.started) {
            this.parseData()
            this.started = true
            this.emit('start')
        }

        let time = (this.yoyo) ? this.duration / 2 : this.duration
        if (time > this.elapsedTime) {
            let t = this.elapsedTime + deltaTime
            let ended = (t >= time)

            this.elapsedTime = ended ? time : t
            this.updateProps(time)

            let realElapsed = this.yoyo ? time + this.elapsedTime : this.elapsedTime
            this.emit('update', realElapsed)

            if (ended) {
                /*if (this.yoyo && !this.reversed) {
                    this.reversed = true;
                    [this.startProps, this.endProps] = [this.endProps, this.startProps]

                    this.emit('reversed')
                    this.elapsedTime = 0
                    return
                }*/

                if (this.repeat && this.repeat > this.repeatCount) {
                    this.repeatCount++
                    this.emit('repeat', this.repeatCount)
                    this.elapsedTime = 0

                    /*if (this.yoyo && this.reversed) {
                        [this.startProps, this.endProps] = [this.endProps, this.startProps]

                        this.reversed = false
                    }*/
                    return
                }

                this.ended = true
                this.active = false
                this.emit('end')
            }
        }
    }

    private canUpdate() {
        return (this.duration && this.active && this.target && this.target.transform)
    }

    private parseData() {
        const startValues = {...this.startProps}
        const endValues = {...this.endProps}

        const startProps = Object.keys(startValues)
        const endProps = Object.keys(endValues)

        const missingStartProps = endProps.filter(key => startProps.indexOf(key) < 0)
        if (missingStartProps.length) {
            Object.assign(startValues, getProps(this.target, missingStartProps))
        }

        const missingEndProps = startProps.filter(key => endProps.indexOf(key) < 0)
        if (missingEndProps.length) {
            Object.assign(endValues, getProps(this.target, missingEndProps))
        }

        this.startProps = startValues
        this.endProps = endValues;

        this.interpolators = {}
        for (let key in this.endProps) {
            if (!isEqual(this.endProps[key], this.startProps[key])) {
                switch (key) {
                    case 'scale':
                    case 'skew':
                        this.interpolators[key] = new PointInterpolator(this.startProps[key], this.endProps[key]);
                        break;
                    case 'tint':
                        this.interpolators[key] = new ColorInterpolator(this.startProps[key], this.endProps[key]);
                        break;
                    default:
                        this.interpolators[key] = new ValueInterpolator(this.startProps[key], this.endProps[key]);
                        break;
                }
            }
        }

        console.log('interpolators', Object.keys(this.interpolators));
    }

    private updateProps(time: number) {
        const t = this.elapsedTime / time
        const m = this.easing(t)

        //console.log('Tween: update props')
        for (const prop in this.interpolators) {
            (<any>this.target)[prop] = this.interpolators[prop].interpolate(m)
        }
    }
}

export namespace Tween {
    export type Event = 'start'|'stop'|'end'|'update'|'repeat'|'reversed'

    export const Events = {
        start: "start",
        stop: "stop",
        end: "end",
        update: "update",
        repeat: "repeat",
        reversed: "reversed"
    }

    export interface Properties {
        active?: boolean
        expire?: boolean
        duration?: number
        delay?: number
        easing?: Easing.Function
        repeat?: number
        yoyo?: boolean
        from?: TweenableProperties
        to?: TweenableProperties
    }
}

function isObject(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

function isEqual(obj1: any, obj2: any): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2)
}

function mergeProps(target: any, source: any): any {
    for (const key in source) {
        if (isObject(source[key])) {
            if (!(key in target)) {
                target[key] = {}
            }
            mergeProps(target[key], source[key])
        } else if (source[key] !== undefined) {
            target[key] = source[key]
        }
    }
}

function getProps(target: any, props: string[]): any {
    const merged: any = {}
    props.forEach((prop) => {
        merged[prop] = target[prop]
    })

    return merged
}
