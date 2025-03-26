import {property} from '@wonderlandengine/api/decorators.js';
import {SimpleAnimationBase} from './simple-animation-base.js';
import {vec3} from 'gl-matrix';

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
    static TypeName = 'tween-scale-animation';
    static InheritProperties = true;

    /**
     * Starting scale factor relative to the object's initial scale
     */
    @property.vector3(1, 1, 1)
    from = [1, 1, 1];

    /**
     * Ending scale factor relative to the object's initial scale
     */
    @property.vector3(1, 1, 1)
    to = [1, 1, 1];

    /**
     * The object's initial scale when animation starts
     * @private
     */
    private _startScale = vec3.create();

    /**
     * Initialize the component, capturing the object's initial scale
     */
    start(): void {
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
    protected override onLerpUpdate(value: number): void {
        // Calculate the interpolated scale
        for (let i = 0; i < 3; i++) {
            tempVec3[i] =
                this._startScale[i] * ((1 - value) * this.from[i] + value * this.to[i]);
        }

        // Apply the scale to the object
        this.object.setScalingLocal(tempVec3);
    }
}
