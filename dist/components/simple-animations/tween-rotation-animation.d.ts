import { SimpleAnimationBase } from './simple-animation-base.js';
/**
 * Component for animating an object's position between two points
 *
 * This component extends SimpleAnimationBase to animate an object's position
 * from a starting position plus an offset (from) to a starting position plus
 * another offset (to). The starting position is captured when the component starts.
 */
export declare class TweenRotationAnimation extends SimpleAnimationBase {
    static TypeName: string;
    static InheritProperties: boolean;
    /**
     * Starting rotation offset relative to the object's initial rotation
     */
    from: number[];
    /**
     * Ending rotation offset relative to the object's initial rotation
     */
    to: number[];
    /**
     * The object's initial rotation when animation starts
     * @private
     */
    private _startRotation;
    /**
     * Initialize the component, capturing the object's initial rotation
     */
    start(): void;
    /**
     * Called by SimpleAnimationBase with the current animation progress value
     * Calculates and applies the interpolated rotation based on the animation progress
     *
     * @param value - Current animation value (0-1) with easing applied
     * @protected
     */
    protected onLerpUpdate(value: number): void;
}
