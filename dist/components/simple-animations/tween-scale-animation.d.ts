import { SimpleAnimationBase } from './simple-animation-base.js';
/**
 * Component for animating an object's scale between two values
 *
 * This component extends SimpleAnimationBase to animate an object's scale
 * from a starting scale multiplied by a factor (from) to a starting scale
 * multiplied by another factor (to). The starting scale is captured when
 * the component starts.
 */
export declare class TweenScaleAnimation extends SimpleAnimationBase {
    static TypeName: string;
    static InheritProperties: boolean;
    /**
     * Starting scale factor relative to the object's initial scale
     */
    from: number[];
    /**
     * Ending scale factor relative to the object's initial scale
     */
    to: number[];
    /**
     * The object's initial scale when animation starts
     * @private
     */
    private _startScale;
    /**
     * Initialize the component, capturing the object's initial scale
     */
    start(): void;
    /**
     * Called by SimpleAnimationBase with the current animation progress value
     * Calculates and applies the interpolated scale based on the animation progress
     *
     * @param value - Current animation value (0-1) with easing applied
     * @protected
     */
    protected onLerpUpdate(value: number): void;
}
