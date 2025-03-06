var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@wonderlandengine/api';
import { property } from '@wonderlandengine/api/decorators.js';
import { Easing, lerp } from '../../utils/lerp.js';
export var SimpleAnimationLerpType;
(function (SimpleAnimationLerpType) {
    SimpleAnimationLerpType[SimpleAnimationLerpType["Linear"] = 0] = "Linear";
    SimpleAnimationLerpType[SimpleAnimationLerpType["EaseIn"] = 1] = "EaseIn";
    SimpleAnimationLerpType[SimpleAnimationLerpType["EaseOut"] = 2] = "EaseOut";
    SimpleAnimationLerpType[SimpleAnimationLerpType["EaseInOut"] = 3] = "EaseInOut";
})(SimpleAnimationLerpType || (SimpleAnimationLerpType = {}));
export var SimpleAnimationStyle;
(function (SimpleAnimationStyle) {
    SimpleAnimationStyle[SimpleAnimationStyle["Once"] = 0] = "Once";
    SimpleAnimationStyle[SimpleAnimationStyle["Loop"] = 1] = "Loop";
    SimpleAnimationStyle[SimpleAnimationStyle["PingPong"] = 2] = "PingPong";
})(SimpleAnimationStyle || (SimpleAnimationStyle = {}));
/**
 * Base component for simple animations. These animations usually are started as soon as an
 * object becones active.
 */
export class SimpleAnimationBase extends Component {
    static TypeName = 'simple-animation-base';
    duration = 1.0;
    method;
    style;
    _elapsedTime = 0;
    _lerpValue = 0;
    _isLerping = false;
    start() {
        this._reset();
        this._isLerping = true;
    }
    update(deltaTime) {
        if (!this._isLerping) {
            return;
        }
        this._elapsedTime += deltaTime;
        this._lerpValue = this._elapsedTime / this.duration;
        if (this._lerpValue >= 1) {
            switch (this.style) {
                case SimpleAnimationStyle.Loop:
                    this._lerpValue = 0;
                    this._elapsedTime = 0;
                    break;
                case SimpleAnimationStyle.PingPong:
                    console.log('PingPong not implemented yet');
                default:
                    this._lerpValue = 1;
                    this._isLerping = false;
                    break;
            }
        }
        switch (this.method) {
            case SimpleAnimationLerpType.EaseIn:
                this.onLerpUpdate(lerp(0, 1, this._lerpValue, Easing.InCubic));
                break;
            case SimpleAnimationLerpType.EaseOut:
                this.onLerpUpdate(lerp(0, 1, this._lerpValue, Easing.OutCubic));
                break;
            case SimpleAnimationLerpType.EaseInOut:
                this.onLerpUpdate(lerp(0, 1, this._lerpValue, Easing.InOutCubic));
                break;
            case SimpleAnimationLerpType.Linear:
            default:
                this.onLerpUpdate(lerp(0, 1, this._lerpValue, Easing.Linear));
                break;
        }
    }
    startLerp() {
        this._reset();
        this._isLerping = true;
    }
    _reset() {
        this._elapsedTime = 0;
        this._lerpValue = 0;
        this._isLerping = false;
    }
    /**
     *
     * @param lerpValue
     */
    onLerpUpdate(lerpValue) {
        // Override this method in derived classes to perform actions during the lerp
    }
}
__decorate([
    property.float(1.0)
], SimpleAnimationBase.prototype, "duration", void 0);
__decorate([
    property.enum(Object.keys(SimpleAnimationLerpType).filter((e) => isNaN(Number(e))))
], SimpleAnimationBase.prototype, "method", void 0);
__decorate([
    property.enum(Object.keys(SimpleAnimationStyle).filter((e) => isNaN(Number(e))))
], SimpleAnimationBase.prototype, "style", void 0);
