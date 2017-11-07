
module pixi_tween {

    export interface Interpolator<T> {
        interpolate(fraction: number): T
    }

    export class ValueInterpolator implements Interpolator<number> {

        private start: number
        private range: number

        constructor(startValue: number, endValue: number) {
            this.start = startValue;
            this.range = endValue - startValue;
        }

        interpolate(fraction: number): number {
            return this.start + fraction * this.range;
        }
    }

    export class PointInterpolator implements Interpolator<PIXI.Point> {

        private x: ValueInterpolator
        private y: ValueInterpolator

        constructor(startPoint: number | PIXI.Point, endPoint: number | PIXI.Point) {
            if (typeof startPoint == 'number') {
                startPoint = new PIXI.Point(<number>startPoint, <number>startPoint)
            }
            if (typeof endPoint == 'number') {
                endPoint = new PIXI.Point(<number>endPoint, <number>endPoint)
            }

            this.x = new ValueInterpolator(startPoint.x, endPoint.x)
            this.y = new ValueInterpolator(startPoint.y, endPoint.y)
        }

        interpolate(fraction: number): PIXI.Point {
            return new PIXI.Point(
                this.x.interpolate(fraction),
                this.y.interpolate(fraction)
            )
        }
    }

    export class ColorInterpolator implements Interpolator<number> {

        private r: ValueInterpolator
        private g: ValueInterpolator
        private b: ValueInterpolator

        constructor(start: number, end: number) {
            let startR = ((start >> 16) & 0xff) / 255.0
            let startG = ((start >> 8) & 0xff) / 255.0
            let startB = ( start & 0xff) / 255.0

            let endR = ((end >> 16) & 0xff) / 255.0
            let endG = ((end >> 8) & 0xff) / 255.0
            let endB = (end & 0xff) / 255.0

            // convert from sRGB to linear
            startR = Math.pow(startR, 2.2)
            startG = Math.pow(startG, 2.2)
            startB = Math.pow(startB, 2.2)
            endR = Math.pow(endR, 2.2)
            endG = Math.pow(endG, 2.2)
            endB = Math.pow(endB, 2.2)

            this.r = new ValueInterpolator(startR, endR)
            this.g = new ValueInterpolator(startG, endG)
            this.b = new ValueInterpolator(startB, endB)
        }

        interpolate(fraction: number): number {
            // compute the interpolated color in linear space
            let r = this.r.interpolate(fraction)
            let g = this.g.interpolate(fraction)
            let b = this.b.interpolate(fraction)

            const factor = 1.0 / 2.2;
            // convert back to sRGB in the [0..255] range
            r = Math.pow(r, factor) * 255.0
            g = Math.pow(g, factor) * 255.0
            b = Math.pow(b, factor) * 255.0

            return Math.round(r) << 16 | Math.round(g) << 8 | Math.round(b)
        }
    }
}