
export namespace Easing {

    export function linear(): Easing.Function {
        return function (t: number): number {
            return t
        }
    }

    export function inQuad(): Easing.Function {
        return function (t: number): number {
            return t * t
        }
    }

    export function outQuad(): Easing.Function {
        return function (t: number): number {
            return t * (2 - t)
        }
    }

    export function inOutQuad(): Easing.Function {
        return function (t: number): number {
            t *= 2
            return (t < 1) ? 0.5 * t * t : -0.5 * ( --t * ( t - 2 ) - 1 )
        }
    }

    export function inCubic(): Easing.Function {
        return function (t: number): number {
            return t * t * t
        }
    }

    export function outCubic(): Easing.Function {
        return function (t: number): number {
            return --t * t * t + 1
        }
    }

    export function inOutCubic(): Easing.Function {
        return function (t: number): number {
            t *= 2
            if (t < 1) return 0.5 * t * t * t
            t -= 2
            return 0.5 * ( t * t * t + 2 )
        }
    }

    export function inQuart(): Easing.Function {
        return function (t: number): number {
            return t * t * t * t
        }
    }

    export function outQuart(): Easing.Function {
        return function (t: number): number {
            return 1 - ( --t * t * t * t )
        }
    }

    export function inOutQuart(): Easing.Function {
        return function (t: number): number {
            t *= 2
            if (t < 1) return 0.5 * t * t * t * t
            t -= 2
            return -0.5 * ( t * t * t * t - 2 )
        }
    }

    export function inQuint(): Easing.Function {
        return function (t: number): number {
            return t * t * t * t * t
        }
    }

    export function outQuint(): Easing.Function {
        return function (t: number): number {
            return --t * t * t * t * t + 1
        }
    }

    export function inOutQuint(): Easing.Function {
        return function (t: number): number {
            t *= 2
            if (t < 1) return 0.5 * t * t * t * t * t
            t -= 2
            return 0.5 * ( t * t * t * t * t + 2 )
        }
    }

    export function inSine(): Easing.Function {
        return function (t: number): number {
            return 1 - Math.cos(t * Math.PI / 2)
        }
    }

    export function outSine(): Easing.Function {
        return function (t: number): number {
            return Math.sin(t * Math.PI / 2)
        }
    }

    export function inOutSine(): Easing.Function {
        return function (t: number): number {
            return 0.5 * ( 1 - Math.cos(Math.PI * t) )
        }
    }

    export function inExpo(): Easing.Function {
        return function (t: number): number {
            return t === 0 ? 0 : Math.pow(1024, t - 1)
        }
    }

    export function outExpo(): Easing.Function {
        return function (t: number): number {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
        }
    }

    export function inOutExpo(): Easing.Function {
        return function (t: number): number {
            if (t === 0) return 0
            if (t === 1) return 1
            t *= 2
            if (t < 1) return 0.5 * Math.pow(1024, t - 1)
            return 0.5 * ( -Math.pow(2, -10 * ( t - 1 )) + 2 )
        }
    }

    export function inCirc(): Easing.Function {
        return function (t: number): number {
            return 1 - Math.sqrt(1 - t * t)
        }
    }

    export function outCirc(): Easing.Function {
        return function (t: number): number {
            return Math.sqrt(1 - ( --t * t ))
        }
    }

    export function inOutCirc(): Easing.Function {
        return function (t: number): number {
            t *= 2
            if (t < 1) return -0.5 * ( Math.sqrt(1 - t * t) - 1)
            return 0.5 * ( Math.sqrt(1 - (t - 2) * (t - 2)) + 1)
        }
    }


    export function inElastic(a = 0.1, p = 0.4): Easing.Function {
        return function (t: number): number {
            let s
            if (t === 0) return 0
            if (t === 1) return 1
            if (!a || a < 1) {
                a = 1
                s = p / 4
            }
            else s = p * Math.asin(1 / a) / ( 2 * Math.PI )
            return -( a * Math.pow(2, 10 * (t - 1)) * Math.sin(( (t - 1) - s ) * ( 2 * Math.PI ) / p) )
        }
    }

    export function outElastic(a = 0.1, p = 0.4): Easing.Function {
        return function (t: number): number {
            let s
            if (t === 0) return 0
            if (t === 1) return 1
            if (!a || a < 1) {
                a = 1
                s = p / 4
            }
            else s = p * Math.asin(1 / a) / ( 2 * Math.PI )
            return ( a * Math.pow(2, -10 * t) * Math.sin(( t - s ) * ( 2 * Math.PI ) / p) + 1 )
        }
    }

    export function inOutElastic(a = 0.1, p = 0.4): Easing.Function {
        return function (t: number): number {
            let s
            if (t === 0) return 0
            if (t === 1) return 1
            if (!a || a < 1) {
                a = 1
                s = p / 4
            }
            else s = p * Math.asin(1 / a) / ( 2 * Math.PI )
            t *= 2
            if (t < 1) return -0.5 * ( a * Math.pow(2, 10 * ( t - 1 )) * Math.sin(( (t - 1) - s ) * ( 2 * Math.PI ) / p) )
            return a * Math.pow(2, -10 * ( t - 1 )) * Math.sin(( (t - 1) - s ) * ( 2 * Math.PI ) / p) * 0.5 + 1
        }
    }

    export function inBack(v: number): Easing.Function {
        return function (t: number): number {
            let s = v || 1.70158
            return t * t * ( ( s + 1 ) * t - s )
        }
    }

    export function outBack(v: number): Easing.Function {
        return function (t: number): number {
            let s = v || 1.70158
            return --t * t * ( ( s + 1 ) * t + s ) + 1
        }
    }

    export function inOutBack(v: number): Easing.Function {
        return function (t: number): number {
            let s = (v || 1.70158) * 1.525
            t *= 2
            if (t < 1) return 0.5 * ( t * t * ( ( s + 1 ) * t - s ) )
            return 0.5 * ( ( t - 2 ) * (t - 2) * ( ( s + 1 ) * (t - 2) + s ) + 2 )
        }
    }

    export function inBounce(): Easing.Function {
        return function (t: number): number {
            return 1 - Easing.outBounce()(1 - t)
        }
    }

    export function outBounce(): Easing.Function {
        return function (t: number): number {
            if (t < ( 1 / 2.75 )) {
                return 7.5625 * t * t
            } else if (t < ( 2 / 2.75 )) {
                t = ( t - ( 1.5 / 2.75 ) )
                return 7.5625 * t * t + 0.75
            } else if (t < ( 2.5 / 2.75 )) {
                t = (t - ( 2.25 / 2.75 ))
                return 7.5625 * t * t + 0.9375
            } else {
                t -= ( 2.625 / 2.75 )
                return 7.5625 * t * t + 0.984375
            }
        }
    }

    export function inOutBounce(): Easing.Function {
        return function (t: number): number {
            if (t < 0.5) return Easing.inBounce()(t * 2) * 0.5
            return Easing.outBounce()(t * 2 - 1) * 0.5 + 0.5
        }
    }
}

export namespace Easing {
    export type Function = (t: number) => number
}
