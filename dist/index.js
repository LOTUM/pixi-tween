var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var pixi_tween;
(function (pixi_tween) {
    var Easing;
    (function (Easing) {
        function linear() {
            return function (t) {
                return t;
            };
        }
        Easing.linear = linear;
        function inQuad() {
            return function (t) {
                return t * t;
            };
        }
        Easing.inQuad = inQuad;
        function outQuad() {
            return function (t) {
                return t * (2 - t);
            };
        }
        Easing.outQuad = outQuad;
        function inOutQuad() {
            return function (t) {
                t *= 2;
                return (t < 1) ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1);
            };
        }
        Easing.inOutQuad = inOutQuad;
        function inCubic() {
            return function (t) {
                return t * t * t;
            };
        }
        Easing.inCubic = inCubic;
        function outCubic() {
            return function (t) {
                return --t * t * t + 1;
            };
        }
        Easing.outCubic = outCubic;
        function inOutCubic() {
            return function (t) {
                t *= 2;
                if (t < 1)
                    return 0.5 * t * t * t;
                t -= 2;
                return 0.5 * (t * t * t + 2);
            };
        }
        Easing.inOutCubic = inOutCubic;
        function inQuart() {
            return function (t) {
                return t * t * t * t;
            };
        }
        Easing.inQuart = inQuart;
        function outQuart() {
            return function (t) {
                return 1 - (--t * t * t * t);
            };
        }
        Easing.outQuart = outQuart;
        function inOutQuart() {
            return function (t) {
                t *= 2;
                if (t < 1)
                    return 0.5 * t * t * t * t;
                t -= 2;
                return -0.5 * (t * t * t * t - 2);
            };
        }
        Easing.inOutQuart = inOutQuart;
        function inQuint() {
            return function (t) {
                return t * t * t * t * t;
            };
        }
        Easing.inQuint = inQuint;
        function outQuint() {
            return function (t) {
                return --t * t * t * t * t + 1;
            };
        }
        Easing.outQuint = outQuint;
        function inOutQuint() {
            return function (t) {
                t *= 2;
                if (t < 1)
                    return 0.5 * t * t * t * t * t;
                t -= 2;
                return 0.5 * (t * t * t * t * t + 2);
            };
        }
        Easing.inOutQuint = inOutQuint;
        function inSine() {
            return function (t) {
                return 1 - Math.cos(t * Math.PI / 2);
            };
        }
        Easing.inSine = inSine;
        function outSine() {
            return function (t) {
                return Math.sin(t * Math.PI / 2);
            };
        }
        Easing.outSine = outSine;
        function inOutSine() {
            return function (t) {
                return 0.5 * (1 - Math.cos(Math.PI * t));
            };
        }
        Easing.inOutSine = inOutSine;
        function inExpo() {
            return function (t) {
                return t === 0 ? 0 : Math.pow(1024, t - 1);
            };
        }
        Easing.inExpo = inExpo;
        function outExpo() {
            return function (t) {
                return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
            };
        }
        Easing.outExpo = outExpo;
        function inOutExpo() {
            return function (t) {
                if (t === 0)
                    return 0;
                if (t === 1)
                    return 1;
                t *= 2;
                if (t < 1)
                    return 0.5 * Math.pow(1024, t - 1);
                return 0.5 * (-Math.pow(2, -10 * (t - 1)) + 2);
            };
        }
        Easing.inOutExpo = inOutExpo;
        function inCirc() {
            return function (t) {
                return 1 - Math.sqrt(1 - t * t);
            };
        }
        Easing.inCirc = inCirc;
        function outCirc() {
            return function (t) {
                return Math.sqrt(1 - (--t * t));
            };
        }
        Easing.outCirc = outCirc;
        function inOutCirc() {
            return function (t) {
                t *= 2;
                if (t < 1)
                    return -0.5 * (Math.sqrt(1 - t * t) - 1);
                return 0.5 * (Math.sqrt(1 - (t - 2) * (t - 2)) + 1);
            };
        }
        Easing.inOutCirc = inOutCirc;
        function inElastic(a, p) {
            if (a === void 0) { a = 0.1; }
            if (p === void 0) { p = 0.4; }
            return function (t) {
                var s;
                if (t === 0)
                    return 0;
                if (t === 1)
                    return 1;
                if (!a || a < 1) {
                    a = 1;
                    s = p / 4;
                }
                else
                    s = p * Math.asin(1 / a) / (2 * Math.PI);
                return -(a * Math.pow(2, 10 * (t - 1)) * Math.sin(((t - 1) - s) * (2 * Math.PI) / p));
            };
        }
        Easing.inElastic = inElastic;
        function outElastic(a, p) {
            if (a === void 0) { a = 0.1; }
            if (p === void 0) { p = 0.4; }
            return function (t) {
                var s;
                if (t === 0)
                    return 0;
                if (t === 1)
                    return 1;
                if (!a || a < 1) {
                    a = 1;
                    s = p / 4;
                }
                else
                    s = p * Math.asin(1 / a) / (2 * Math.PI);
                return (a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1);
            };
        }
        Easing.outElastic = outElastic;
        function inOutElastic(a, p) {
            if (a === void 0) { a = 0.1; }
            if (p === void 0) { p = 0.4; }
            return function (t) {
                var s;
                if (t === 0)
                    return 0;
                if (t === 1)
                    return 1;
                if (!a || a < 1) {
                    a = 1;
                    s = p / 4;
                }
                else
                    s = p * Math.asin(1 / a) / (2 * Math.PI);
                t *= 2;
                if (t < 1)
                    return -0.5 * (a * Math.pow(2, 10 * (t - 1)) * Math.sin(((t - 1) - s) * (2 * Math.PI) / p));
                return a * Math.pow(2, -10 * (t - 1)) * Math.sin(((t - 1) - s) * (2 * Math.PI) / p) * 0.5 + 1;
            };
        }
        Easing.inOutElastic = inOutElastic;
        function inBack(v) {
            var s = v || 1.70158;
            return function (t) {
                return t * t * ((s + 1) * t - s);
            };
        }
        Easing.inBack = inBack;
        function outBack(v) {
            var s = v || 1.70158;
            return function (t) {
                return --t * t * ((s + 1) * t + s) + 1;
            };
        }
        Easing.outBack = outBack;
        function inOutBack(v) {
            var s = (v || 1.70158) * 1.525;
            return function (t) {
                t *= 2;
                if (t < 1)
                    return 0.5 * (t * t * ((s + 1) * t - s));
                return 0.5 * ((t - 2) * (t - 2) * ((s + 1) * (t - 2) + s) + 2);
            };
        }
        Easing.inOutBack = inOutBack;
        function inBounce() {
            return function (t) {
                return 1 - Easing.outBounce()(1 - t);
            };
        }
        Easing.inBounce = inBounce;
        function outBounce() {
            return function (t) {
                if (t < (1 / 2.75)) {
                    return 7.5625 * t * t;
                }
                else if (t < (2 / 2.75)) {
                    t = (t - (1.5 / 2.75));
                    return 7.5625 * t * t + 0.75;
                }
                else if (t < (2.5 / 2.75)) {
                    t = (t - (2.25 / 2.75));
                    return 7.5625 * t * t + 0.9375;
                }
                else {
                    t -= (2.625 / 2.75);
                    return 7.5625 * t * t + 0.984375;
                }
            };
        }
        Easing.outBounce = outBounce;
        function inOutBounce() {
            return function (t) {
                if (t < 0.5)
                    return Easing.inBounce()(t * 2) * 0.5;
                return Easing.outBounce()(t * 2 - 1) * 0.5 + 0.5;
            };
        }
        Easing.inOutBounce = inOutBounce;
    })(Easing = pixi_tween.Easing || (pixi_tween.Easing = {}));
})(pixi_tween || (pixi_tween = {}));
var pixi_tween;
(function (pixi_tween) {
    var ValueInterpolator = (function () {
        function ValueInterpolator(startValue, endValue) {
            this.start = startValue;
            this.range = endValue - startValue;
        }
        ValueInterpolator.prototype.interpolate = function (fraction) {
            return this.start + fraction * this.range;
        };
        return ValueInterpolator;
    }());
    pixi_tween.ValueInterpolator = ValueInterpolator;
    var PointInterpolator = (function () {
        function PointInterpolator(startPoint, endPoint) {
            if (typeof startPoint == 'number') {
                startPoint = new PIXI.Point(startPoint, startPoint);
            }
            if (typeof endPoint == 'number') {
                endPoint = new PIXI.Point(endPoint, endPoint);
            }
            this.x = new ValueInterpolator(startPoint.x, endPoint.x);
            this.y = new ValueInterpolator(startPoint.y, endPoint.y);
        }
        PointInterpolator.prototype.interpolate = function (fraction) {
            return new PIXI.Point(this.x.interpolate(fraction), this.y.interpolate(fraction));
        };
        return PointInterpolator;
    }());
    pixi_tween.PointInterpolator = PointInterpolator;
    var ColorInterpolator = (function () {
        function ColorInterpolator(start, end) {
            var startR = ((start >> 16) & 0xff) / 255.0;
            var startG = ((start >> 8) & 0xff) / 255.0;
            var startB = (start & 0xff) / 255.0;
            var endR = ((end >> 16) & 0xff) / 255.0;
            var endG = ((end >> 8) & 0xff) / 255.0;
            var endB = (end & 0xff) / 255.0;
            startR = Math.pow(startR, 2.2);
            startG = Math.pow(startG, 2.2);
            startB = Math.pow(startB, 2.2);
            endR = Math.pow(endR, 2.2);
            endG = Math.pow(endG, 2.2);
            endB = Math.pow(endB, 2.2);
            this.r = new ValueInterpolator(startR, endR);
            this.g = new ValueInterpolator(startG, endG);
            this.b = new ValueInterpolator(startB, endB);
        }
        ColorInterpolator.prototype.interpolate = function (fraction) {
            var r = this.r.interpolate(fraction);
            var g = this.g.interpolate(fraction);
            var b = this.b.interpolate(fraction);
            var factor = 1.0 / 2.2;
            r = Math.pow(r, factor) * 255.0;
            g = Math.pow(g, factor) * 255.0;
            b = Math.pow(b, factor) * 255.0;
            return Math.round(r) << 16 | Math.round(g) << 8 | Math.round(b);
        };
        return ColorInterpolator;
    }());
    pixi_tween.ColorInterpolator = ColorInterpolator;
})(pixi_tween || (pixi_tween = {}));
var pixi_tween;
(function (pixi_tween) {
    var DefaultProperties = {
        active: false,
        expire: true,
        duration: 1000,
        delay: 0,
        easing: pixi_tween.Easing.linear(),
        repeat: 0,
        yoyo: false
    };
    var Tween = (function (_super) {
        __extends(Tween, _super);
        function Tween(target, props) {
            var _this = _super.call(this) || this;
            _this.target = target;
            _this.apply(props);
            return _this;
        }
        Tween.create = function (target, props) {
            var merged = __assign({}, DefaultProperties);
            if (!Array.isArray(props)) {
                mergeProps(merged, props);
            }
            else {
                props.forEach(function (part) {
                    mergeProps(merged, part);
                });
            }
            return new Tween(target, merged);
        };
        Tween.animate = function (node, params) {
            return Tween.create(node, params).promise(Tween.Events.end);
        };
        Object.defineProperty(Tween.prototype, "endTime", {
            get: function () {
                return this.delay + this.duration;
            },
            enumerable: true,
            configurable: true
        });
        Tween.prototype.promise = function (event) {
            var _this = this;
            return new Promise(function (resolve) {
                _this.once(event, resolve);
            });
        };
        Tween.prototype.start = function () {
            this.active = true;
            return this;
        };
        Tween.prototype.stop = function () {
            this.active = false;
            this.emit('stop');
            return this;
        };
        Tween.prototype.from = function (props) {
            this.startProps = props;
            return this;
        };
        Tween.prototype.to = function (props) {
            this.endProps = props;
            return this;
        };
        Tween.prototype.remove = function () {
            if (this.manager) {
                this.manager.remove(this);
                this.manager = undefined;
            }
            return this;
        };
        Tween.prototype.apply = function (props) {
            this.duration = props.duration;
            this.delay = props.delay;
            this.easing = props.easing;
            this.repeat = props.repeat;
            this.yoyo = props.yoyo;
            this.expire = props.expire;
            this.from(props.from);
            this.to(props.to);
            return this;
        };
        Tween.prototype.clear = function () {
            this.active = false;
            this.duration = 0;
            this.delay = 0;
            this.easing = pixi_tween.Easing.linear();
            this.expire = false;
            this.repeat = 0;
            this.yoyo = false;
            this.started = false;
            this.ended = false;
            this.startProps = null;
            this.endProps = null;
            this.delayTime = 0;
            this.elapsedTime = 0;
            this.repeatCount = 0;
            this.reversed = false;
            return this;
        };
        Tween.prototype.reset = function () {
            this.elapsedTime = 0;
            this.repeatCount = 0;
            this.delayTime = 0;
            this.started = false;
            this.ended = false;
            if (this.yoyo && this.reversed) {
                _a = [this.endProps, this.startProps], this.startProps = _a[0], this.endProps = _a[1];
                this.reversed = false;
            }
            return this;
            var _a;
        };
        Tween.prototype.update = function (deltaTime) {
            if (!this.canUpdate() && (this.endProps)) {
                return;
            }
            if (this.delay > this.delayTime) {
                this.delayTime += deltaTime;
                return;
            }
            if (!this.started) {
                this.parseData();
                this.started = true;
                this.emit('start');
            }
            var time = (this.yoyo) ? this.duration / 2 : this.duration;
            if (time > this.elapsedTime) {
                var t = this.elapsedTime + deltaTime;
                var ended = (t >= time);
                this.elapsedTime = ended ? time : t;
                this.updateProps(time);
                var realElapsed = this.yoyo ? time + this.elapsedTime : this.elapsedTime;
                this.emit('update', realElapsed);
                if (ended) {
                    if (this.yoyo && !this.reversed) {
                        this.reversed = true;
                        _a = [this.endProps, this.startProps], this.startProps = _a[0], this.endProps = _a[1];
                        this.updateInterpolators();
                        this.emit('reversed');
                        this.elapsedTime = 0;
                        return;
                    }
                    if (this.repeat && this.repeat > this.repeatCount) {
                        this.repeatCount++;
                        this.emit('repeat', this.repeatCount);
                        this.elapsedTime = 0;
                        if (this.yoyo && this.reversed) {
                            _b = [this.endProps, this.startProps], this.startProps = _b[0], this.endProps = _b[1];
                            this.updateInterpolators();
                            this.reversed = false;
                        }
                        return;
                    }
                    this.ended = true;
                    this.active = false;
                    this.emit('end');
                }
            }
            var _a, _b;
        };
        Tween.prototype.canUpdate = function () {
            return (this.duration && this.active && this.target && this.target.transform);
        };
        Tween.prototype.parseData = function () {
            var startValues = __assign({}, this.startProps);
            var endValues = __assign({}, this.endProps);
            var startProps = Object.keys(startValues);
            var endProps = Object.keys(endValues);
            var missingStartProps = endProps.filter(function (key) { return startProps.indexOf(key) < 0; });
            if (missingStartProps.length) {
                Object.assign(startValues, getProps(this.target, missingStartProps));
            }
            var missingEndProps = startProps.filter(function (key) { return endProps.indexOf(key) < 0; });
            if (missingEndProps.length) {
                Object.assign(endValues, getProps(this.target, missingEndProps));
            }
            this.startProps = startValues;
            this.endProps = endValues;
            this.updateInterpolators();
        };
        Tween.prototype.updateInterpolators = function () {
            this.interpolators = {};
            for (var key in this.endProps) {
                if (!isEqual(this.endProps[key], this.startProps[key])) {
                    switch (key) {
                        case 'scale':
                        case 'skew':
                            this.interpolators[key] = new pixi_tween.PointInterpolator(this.startProps[key], this.endProps[key]);
                            break;
                        case 'tint':
                            this.interpolators[key] = new pixi_tween.ColorInterpolator(this.startProps[key], this.endProps[key]);
                            break;
                        default:
                            this.interpolators[key] = new pixi_tween.ValueInterpolator(this.startProps[key], this.endProps[key]);
                            break;
                    }
                }
            }
            console.log('interpolators', Object.keys(this.interpolators));
        };
        Tween.prototype.updateProps = function (time) {
            var t = this.elapsedTime / time;
            var m = this.easing(t);
            for (var prop in this.interpolators) {
                this.target[prop] = this.interpolators[prop].interpolate(m);
            }
        };
        return Tween;
    }(PIXI.utils.EventEmitter));
    pixi_tween.Tween = Tween;
    (function (Tween) {
        Tween.Events = {
            start: "start",
            stop: "stop",
            end: "end",
            update: "update",
            repeat: "repeat",
            reversed: "reversed"
        };
    })(Tween = pixi_tween.Tween || (pixi_tween.Tween = {}));
})(pixi_tween || (pixi_tween = {}));
function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}
function isEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}
function mergeProps(target, source) {
    for (var key in source) {
        if (isObject(source[key])) {
            if (!(key in target)) {
                target[key] = {};
            }
            mergeProps(target[key], source[key]);
        }
        else if (source[key] !== undefined) {
            target[key] = source[key];
        }
    }
}
function getProps(target, props) {
    var merged = {};
    props.forEach(function (prop) {
        merged[prop] = target[prop];
    });
    return merged;
}
var pixi_tween;
(function (pixi_tween) {
    var TweenGroup = (function () {
        function TweenGroup(manager, props) {
            this.tweens = [];
            this.manager = manager;
            this.loop = props.loop;
        }
        TweenGroup.prototype.add = function (target, props) {
            var tween = this.manager.create(target, props);
            this.tweens.push(tween);
            return tween;
        };
        TweenGroup.prototype.on = function (event, callback) {
            var filter;
            if (event == 'start') {
                filter = function (prev, current) {
                    return prev.delay < current.delay ? prev : current;
                };
            }
            else {
                filter = function (prev, current) {
                    return prev.endTime > current.endTime ? prev : current;
                };
            }
            this.tweens.reduce(filter).on(event.toString(), callback);
        };
        TweenGroup.prototype.promise = function (event) {
            var _this = this;
            return new Promise(function (resolve) {
                _this.on(event, resolve);
            });
        };
        TweenGroup.prototype.start = function () {
            var _this = this;
            if (this.loop) {
                this.on('end', function () {
                    _this.tweens.forEach(function (tween, index) {
                        tween.reset();
                        tween.start();
                    });
                });
            }
            this.tweens.forEach(function (tween) {
                if (!tween.manager) {
                    _this.manager.add(tween);
                }
                tween.start();
            });
            return this;
        };
        TweenGroup.prototype.stop = function () {
            this.tweens.forEach(function (tween) { return tween.stop(); });
        };
        TweenGroup.prototype.remove = function () {
            this.tweens.forEach(function (tween) {
                tween.remove();
            });
        };
        return TweenGroup;
    }());
    pixi_tween.TweenGroup = TweenGroup;
    (function (TweenGroup) {
        TweenGroup.Events = {
            start: 'start',
            end: 'end'
        };
    })(TweenGroup = pixi_tween.TweenGroup || (pixi_tween.TweenGroup = {}));
})(pixi_tween || (pixi_tween = {}));
var pixi_tween;
(function (pixi_tween) {
    var TweenManager = (function (_super) {
        __extends(TweenManager, _super);
        function TweenManager() {
            var _this = _super.call(this) || this;
            _this.tweens = [];
            _this.tweensToDelete = [];
            _this.interactive = false;
            return _this;
        }
        TweenManager.prototype.attach = function (ticker) {
            var _this = this;
            ticker.add(function () {
                _this.update(ticker.elapsedMS);
            });
            this.on(TweenManager.Events.interactive, function (interactive) {
                if (interactive) {
                    ticker.start();
                }
                else {
                    ticker.stop();
                }
            });
        };
        TweenManager.prototype.update = function (deltaTime) {
            for (var i = 0; i < this.tweens.length; i++) {
                var tween = this.tweens[i];
                if (tween.active) {
                    tween.update(deltaTime);
                    if (tween.ended && tween.expire) {
                        tween.remove();
                    }
                }
            }
            if (this.tweensToDelete.length) {
                for (var i = 0; i < this.tweensToDelete.length; i++) {
                    this.dump(this.tweensToDelete[i]);
                }
                this.tweensToDelete.length = 0;
            }
        };
        TweenManager.prototype.get = function (target) {
            var tweens = [];
            for (var i = 0; i < this.tweens.length; i++) {
                if (this.tweens[i].target === target) {
                    tweens.push(this.tweens[i]);
                }
            }
            return tweens;
        };
        TweenManager.prototype.group = function (props) {
            return new pixi_tween.TweenGroup(this, props);
        };
        TweenManager.prototype.sequence = function () {
            return new pixi_tween.TweenSequence(this);
        };
        TweenManager.prototype.create = function (target, props) {
            return this.add(pixi_tween.Tween.create(target, props));
        };
        TweenManager.prototype.run = function (tween) {
            this.add(tween);
            tween.start();
            return tween.promise(pixi_tween.Tween.Events.end);
        };
        TweenManager.prototype.add = function (tween) {
            tween.manager = this;
            this.tweens.push(tween);
            this.toggle(true);
            return tween;
        };
        TweenManager.prototype.remove = function (tween) {
            this.tweensToDelete.push(tween);
        };
        TweenManager.prototype.dump = function (tween) {
            var index = this.tweens.indexOf(tween);
            if (index !== -1) {
                this.tweens.splice(index, 1);
            }
            if (this.tweens.length === 0) {
                this.toggle(false);
            }
        };
        TweenManager.prototype.toggle = function (interactive) {
            if (this.interactive !== interactive) {
                this.interactive = interactive;
                this.emit(TweenManager.Events.interactive, interactive);
            }
        };
        return TweenManager;
    }(PIXI.utils.EventEmitter));
    pixi_tween.TweenManager = TweenManager;
    (function (TweenManager) {
        TweenManager.Events = {
            interactive: 'interactive'
        };
    })(TweenManager = pixi_tween.TweenManager || (pixi_tween.TweenManager = {}));
})(pixi_tween || (pixi_tween = {}));
Object.assign(PIXI, {
    tween: pixi_tween,
    tweenManager: new pixi_tween.TweenManager()
});
var pixi_tween;
(function (pixi_tween) {
    var TweenSequence = (function () {
        function TweenSequence(manager) {
            this.tweens = [];
            this.manager = manager;
        }
        TweenSequence.prototype.add = function (target, props) {
            var tween = pixi_tween.Tween.create(target, props);
            this.tweens.push(tween);
            return tween;
        };
        TweenSequence.prototype.on = function (event, callback) {
            var position = event == "start" ? 0 : this.tweens.length - 1;
            this.tweens[position].on(event, callback);
        };
        TweenSequence.prototype.promise = function (event) {
            var _this = this;
            return new Promise(function (resolve) {
                _this.on(event, resolve);
            });
        };
        TweenSequence.prototype.start = function () {
            var _this = this;
            var index = 0;
            this.manager.run(this.tweens[index]).then(function () {
                index++;
                if (index < _this.tweens.length) {
                    return _this.manager.run(_this.tweens[index]);
                }
            });
            return this;
        };
        return TweenSequence;
    }());
    pixi_tween.TweenSequence = TweenSequence;
    (function (TweenSequence) {
        TweenSequence.Events = {
            start: "start",
            end: "end"
        };
    })(TweenSequence = pixi_tween.TweenSequence || (pixi_tween.TweenSequence = {}));
})(pixi_tween || (pixi_tween = {}));
//# sourceMappingURL=index.js.map