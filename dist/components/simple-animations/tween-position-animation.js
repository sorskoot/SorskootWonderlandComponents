var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { property } from '@wonderlandengine/api/decorators.js';
import { SimpleAnimationBase } from './simple-animation-base.js';
const tempvec3 = [0, 0, 0];
export class TweenPositionAnimation extends SimpleAnimationBase {
    static TypeName = 'tween-position-animation';
    static InheritProperties = true;
    from = [0, 0, 0];
    to = [0, 0, 0];
    _startPosition = [0, 0, 0];
    start() {
        super.start();
        this.object.getPositionLocal(this._startPosition);
    }
    onLerpUpdate(value) {
        for (let i = 0; i < 3; i++) {
            tempvec3[i] =
                this._startPosition[i] + this.from[i] * (1 - value) + this.to[i] * value;
        }
        this.object.setPositionLocal(tempvec3);
    }
}
__decorate([
    property.vector3(0, 0, 0)
], TweenPositionAnimation.prototype, "from", void 0);
__decorate([
    property.vector3(0, 0, 0)
], TweenPositionAnimation.prototype, "to", void 0);
