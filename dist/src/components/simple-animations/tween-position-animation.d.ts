import { SimpleAnimationBase } from './simple-animation-base.js';
/**
 * Component for animating an object's position between two points
 *
 * This component extends SimpleAnimationBase to animate an object's position
 * from a starting position plus an offset (from) to a starting position plus
 * another offset (to). The starting position is captured when the component starts.
 */
export declare class TweenPositionAnimation extends SimpleAnimationBase {
    static TypeName: string;
    static InheritProperties: boolean;
    /**
     * Starting position offset relative to the object's initial position
     */
    from: number[];
    /**
     * Ending position offset relative to the object's initial position
     */
    to: number[];
    /**
     * The object's initial position when animation starts
     * @private
     */
    private _startPosition;
    /**
     * Initialize the component, capturing the object's initial position
     */
    start(): void;
    /**
     * Called by SimpleAnimationBase with the current animation progress value
     * Calculates and applies the interpolated position based on the animation progress
     *
     * @param value - Current animation value (0-1) with easing applied
     * @protected
     */
    protected onLerpUpdate(value: number): void;
}
