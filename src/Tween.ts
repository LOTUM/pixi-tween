import * as PIXI from 'pixi.js'

import {Easing} from './Easing'
import {TweenManager} from './TweenManager'

export interface TweenableProperties {
    x?: number
    y?: number
    width?: number
    height?: number
    rotation?: number
    scale?: number | PIXI.Point
    tint?: number
    alpha?: number
}

const DefaultProperties: Tween.Properties = {
    time: 1000,
    delay: 0,
    easing: Easing.linear(),
    repeat: 0,
    yoyo: false,
    active: false
}

/**
 * @namespace PIXI.tween
 */

export class Tween extends PIXI.utils.EventEmitter {

    public readonly target: PIXI.DisplayObject
    public manager: TweenManager

    public active: boolean
    public time: number
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
        this.set(props)
    }

    get endTime() {
        return this.delay + this.time
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

    set(props: Tween.Properties) {
        //console.log('Tween: merged params', Array.isArray(params), merged)
        this.time = props.time
        this.delay = props.delay
        this.easing = props.easing
        this.repeat = props.repeat
        this.yoyo = props.yoyo
        this.expire = true //todo: check if we can omit expire

        const fromState = props.from ? createProps(props.from) : {}
        const toState = props.to ? createProps(props.to) : {}

        const fromKeys = Object.keys(fromState)
        const toKeys = Object.keys(toState)

        //console.log('Tween: initial states', fromState, fromKeys, toState, toKeys)
        const missingFromKeys = toKeys.filter(key => fromKeys.indexOf(key) < 0)
        if (missingFromKeys.length) {
            Object.assign(fromState, getProps(this.target, missingFromKeys))
            //console.log('Tween: props from state', missingFromKeys, fromState)
        }

        const missingToKeys = fromKeys.filter(key => toKeys.indexOf(key) < 0)
        if (missingToKeys.length) {
            Object.assign(toState, getProps(this.target, missingToKeys))
            //console.log('Tween: props to state', missingToKeys, toState)
        }

        //console.log('Tween: apply state', fromState);
        this.from(fromState)
        this.to(toState)

        if (props.active) {
            Object.assign(this.target, fromState)
            this.active = true
        }
    }

    clear(): Tween {
        this.time = 0
        this.active = false
        this.easing = Easing.linear()
        this.expire = false
        this.repeat = 0
        this.delay = 0
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
        this.repeat = 0
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

        let time = (this.yoyo) ? this.time / 2 : this.time
        if (time > this.elapsedTime) {
            let t = this.elapsedTime + deltaTime
            let ended = (t >= time)

            this.elapsedTime = ended ? time : t
            this.apply(time)

            let realElapsed = this.yoyo ? time + this.elapsedTime : this.elapsedTime
            this.emit('update', realElapsed)

            if (ended) {
                if (this.yoyo && !this.reversed) {
                    this.reversed = true;
                    [this.startProps, this.endProps] = [this.endProps, this.startProps]

                    /*if (this.path) {
                        endProps = this.pathTo
                        startProps = this.pathFrom
                        this.pathTo = startProps
                        this.pathFrom = endProps
                    }*/

                    this.emit('reversed')
                    this.elapsedTime = 0
                    return
                }

                if (this.repeat && this.repeat > this.repeatCount) {
                    this.repeatCount++
                    this.emit('repeat', this.repeatCount)
                    this.elapsedTime = 0

                    if (this.yoyo && this.reversed) {
                        [this.startProps, this.endProps] = [this.endProps, this.startProps]

                        /*if (this.path) {
                            endProps = this.pathTo
                            startProps = this.pathFrom
                            this.pathTo = startProps
                            this.pathFrom = endProps
                        }*/

                        this.reversed = false
                    }
                    return
                }

                this.ended = true
                this.active = false
                this.emit('end')
            }
        }
    }

    private canUpdate() {
        return (this.time && this.active && this.target && this.target.transform)
    }

    private parseData() {
        if (this.started) {
            return
        }

        if (!this.startProps) {
            this.startProps = {}
        }

        parseRecursiveData(this.endProps, this.startProps, this.target)
        /*if (this.path) {
            let distance = this.path.totalDistance()
            if (this.pathReverse) {
                this.pathFrom = distance
                this.pathTo = 0
            } else {
                this.pathFrom = 0
                this.pathTo = distance
            }
        }*/
    }

    private apply(time: number) {
        recursiveApplyTween(this.endProps, this.startProps, this.target, time, this.elapsedTime, this.easing)
        /*if (this.path) {
            let time = (this.pingPong) ? this.time / 2 : this.time
            let b = this.pathFrom
            let c = this.pathTo - this.pathFrom
            let d = time
            let t = this._elapsedTime / d

            let distance = b + (c * this.easing(t))
            let pos = this.path.getPointAtDistance(distance)
            this.target.position.set(pos.x, pos.y)
        }*/
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
        time?: number
        delay?: number
        easing?: Easing.Function
        repeat?: number
        yoyo?: boolean
        active?: boolean
        from?: TweenableProperties
        to?: TweenableProperties
    }

    export type PropertyList = Properties | Properties[]
}

function recursiveApplyTween(to: any, from: any, target: any, time: number, elapsed: number, easing: Easing.Function) {
    for (let k in to) {
        if (!isObject(to[k])) {
            let b = from[k]
            let c = to[k] - from[k]
            let d = time
            let t = elapsed / d
            target[k] = b + (c * easing(t))
        } else {
            recursiveApplyTween(to[k], from[k], target[k], time, elapsed, easing)
        }
    }
}

function parseRecursiveData(to: any, from: any, target: any) {
    for (let prop in to) {
        if (from[prop] !== 0 && !from[prop]) {
            if (!isObject(target[prop])) {
                from[prop] = target[prop]
            } else {
                from[prop] = JSON.parse(JSON.stringify(target[prop]))
                parseRecursiveData(to[prop], from[prop], target[prop])
            }
        }
    }
}

function isObject(obj: any) {
    return Object.prototype.toString.call(obj) === '[object Object]'
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

function createProps(props: any): any {
    let mapped: any = {}
    for (const name in props) {
        if (name === "scale") {
            mapped[name] = {x: props[name], y: props[name]}
        } else {
            mapped[name] = props[name]
        }
    }

    return mapped
}

function getProps(target: any, props: string[]): any {
    const merged: any = {}
    for (const prop of props) {
        if (prop === "scale") {
            merged[prop] = {x: target[prop].x, y: target[prop].y}
        } else {
            merged[prop] = target[prop]
        }
    }

    //console.log('Tween: get state', state)
    return merged
}
