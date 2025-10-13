var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { property } from '@wonderlandengine/api/decorators.js';
import { SimpleAnimationBase } from './simple-animation-base.js';
import { vec3 } from 'gl-matrix';
// Temporary vector for calculations to avoid creating new objects every frame
const tempVec3 = vec3.create();
/**
 * Component for animating an object's scale between two values
 *
 * This component extends SimpleAnimationBase to animate an object's scale
 * from a starting scale multiplied by a factor (from) to a starting scale
 * multiplied by another factor (to). The starting scale is captured when
 * the component starts.
 */
export class TweenScaleAnimation extends SimpleAnimationBase {
    constructor() {
        super(...arguments);
        /**
         * Starting scale factor relative to the object's initial scale
         */
        this.from = [1, 1, 1];
        /**
         * Ending scale factor relative to the object's initial scale
         */
        this.to = [1, 1, 1];
        /**
         * The object's initial scale when animation starts
         * @private
         */
        this._startScale = vec3.create();
    }
    /**
     * Initialize the component, capturing the object's initial scale
     */
    start() {
        super.start();
        this.object.getScalingLocal(this._startScale);
    }
    /**
     * Called by SimpleAnimationBase with the current animation progress value
     * Calculates and applies the interpolated scale based on the animation progress
     *
     * @param value - Current animation value (0-1) with easing applied
     * @protected
     */
    onLerpUpdate(value) {
        // Calculate the interpolated scale
        for (let i = 0; i < 3; i++) {
            tempVec3[i] =
                this._startScale[i] * ((1 - value) * this.from[i] + value * this.to[i]);
        }
        // Apply the scale to the object
        this.object.setScalingLocal(tempVec3);
    }
}
TweenScaleAnimation.TypeName = 'tween-scale-animation';
TweenScaleAnimation.InheritProperties = true;
__decorate([
    property.vector3(1, 1, 1)
], TweenScaleAnimation.prototype, "from", void 0);
__decorate([
    property.vector3(1, 1, 1)
], TweenScaleAnimation.prototype, "to", void 0);
