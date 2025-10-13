var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SimpleAnimationBase } from './simple-animation-base.js';
import { property } from '@wonderlandengine/api/decorators.js';
import { quat } from 'gl-matrix';
// Temporary quaternion for calculations to avoid creating new objects every frame
const tempQuat = quat.create();
/**
 * Component for animating an object's position between two points
 *
 * This component extends SimpleAnimationBase to animate an object's position
 * from a starting position plus an offset (from) to a starting position plus
 * another offset (to). The starting position is captured when the component starts.
 */
export class TweenRotationAnimation extends SimpleAnimationBase {
    constructor() {
        super(...arguments);
        /**
         * Starting rotation offset relative to the object's initial rotation
         */
        this.from = [0, 0, 0];
        /**
         * Ending rotation offset relative to the object's initial rotation
         */
        this.to = [0, 0, 0];
        /**
         * The object's initial rotation when animation starts
         * @private
         */
        this._startRotation = quat.create();
    }
    /**
     * Initialize the component, capturing the object's initial rotation
     */
    start() {
        super.start();
        this.object.getRotationLocal(this._startRotation);
    }
    /**
     * Called by SimpleAnimationBase with the current animation progress value
     * Calculates and applies the interpolated rotation based on the animation progress
     *
     * @param value - Current animation value (0-1) with easing applied
     * @protected
     */
    onLerpUpdate(value) {
        // Calculate the interpolated rotation
        quat.fromEuler(tempQuat, this.from[0] + (this.to[0] - this.from[0]) * value, this.from[1] + (this.to[1] - this.from[1]) * value, this.from[2] + (this.to[2] - this.from[2]) * value);
        // Apply the rotation to the object
        this.object.setRotationLocal(tempQuat);
    }
}
TweenRotationAnimation.TypeName = 'tween-rotation-animation';
TweenRotationAnimation.InheritProperties = true;
__decorate([
    property.vector3(0, 0, 0)
], TweenRotationAnimation.prototype, "from", void 0);
__decorate([
    property.vector3(0, 0, 0)
], TweenRotationAnimation.prototype, "to", void 0);
