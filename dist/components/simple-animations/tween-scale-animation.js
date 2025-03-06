var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { property } from '@wonderlandengine/api/decorators.js';
import { SimpleAnimationBase } from './simple-animation-base.js';
export class TweenScaleAnimation extends SimpleAnimationBase {
    static TypeName = 'tween-scale-animation';
    static InheritProperties = true;
    from = [1, 1, 1];
    to = [1, 1, 1];
    _startScale = [1, 1, 1];
    _tempvec3 = [0, 0, 0];
    start() {
        super.start();
        this.object.getScalingLocal(this._startScale);
    }
    onLerpUpdate(value) {
        for (let i = 0; i < 3; i++) {
            this._tempvec3[i] =
                this._startScale[i] * ((1 - value) * this.from[i] + value * this.to[i]);
        }
        this.object.setScalingLocal(this._tempvec3);
    }
}
__decorate([
    property.vector3(1, 1, 1)
], TweenScaleAnimation.prototype, "from", void 0);
__decorate([
    property.vector3(1, 1, 1)
], TweenScaleAnimation.prototype, "to", void 0);
