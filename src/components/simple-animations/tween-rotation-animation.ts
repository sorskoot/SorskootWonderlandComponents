import {SimpleAnimationBase} from './simple-animation-base.js';
import {property} from '@wonderlandengine/api/decorators.js';
import {quat, vec3} from 'gl-matrix';

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
    static TypeName = 'tween-rotation-animation';
    static InheritProperties = true;

    /**
     * Starting rotation offset relative to the object's initial rotation
     */
    @property.vector3(0, 0, 0)
    from = [0, 0, 0];

    /**
     * Ending rotation offset relative to the object's initial rotation
     */
    @property.vector3(0, 0, 0)
    to = [0, 0, 0];

    /**
     * The object's initial rotation when animation starts
     * @private
     */
    private _startRotation = quat.create();

    /**
     * Initialize the component, capturing the object's initial rotation
     */
    start(): void {
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
    protected override onLerpUpdate(value: number): void {
        // Calculate the interpolated rotation
        quat.fromEuler(
            tempQuat,
            this.from[0] + (this.to[0] - this.from[0]) * value,
            this.from[1] + (this.to[1] - this.from[1]) * value,
            this.from[2] + (this.to[2] - this.from[2]) * value
        );

        // Apply the rotation to the object
        this.object.setRotationLocal(tempQuat);
    }
}
