import {property} from '@wonderlandengine/api/decorators.js';
import {SimpleAnimationBase} from './simple-animation-base.js';
import {vec3} from 'gl-matrix';

// Temporary vector for calculations to avoid creating new objects every frame
const tempVec3 = vec3.create();

/**
 * Component for animating an object's position between two points
 *
 * This component extends SimpleAnimationBase to animate an object's position
 * from a starting position plus an offset (from) to a starting position plus
 * another offset (to). The starting position is captured when the component starts.
 */
export class TweenPositionAnimation extends SimpleAnimationBase {
    static TypeName = 'tween-position-animation';
    static InheritProperties = true;

    /**
     * Starting position offset relative to the object's initial position
     */
    @property.vector3(0, 0, 0)
    from = [0, 0, 0];

    /**
     * Ending position offset relative to the object's initial position
     */
    @property.vector3(0, 0, 0)
    to = [0, 0, 0];

    /**
     * The object's initial position when animation starts
     * @private
     */
    private _startPosition = vec3.create();

    /**
     * Initialize the component, capturing the object's initial position
     */
    start(): void {
        super.start();
        this.object.getPositionLocal(this._startPosition);
    }

    /**
     * Called by SimpleAnimationBase with the current animation progress value
     * Calculates and applies the interpolated position based on the animation progress
     *
     * @param value - Current animation value (0-1) with easing applied
     * @protected
     */
    protected override onLerpUpdate(value: number): void {
        // Calculate the interpolated position
        for (let i = 0; i < 3; i++) {
            tempVec3[i] =
                this._startPosition[i] + this.from[i] * (1 - value) + this.to[i] * value;
        }

        // Apply the position to the object
        this.object.setPositionLocal(tempVec3);
    }
}
