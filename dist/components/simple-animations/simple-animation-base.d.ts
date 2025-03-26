import { Component } from '@wonderlandengine/api';
/**
 * Enum defining the different lerp types available for animations
 */
export declare enum SimpleAnimationLerpType {
    Linear = 0,
    EaseIn = 1,
    EaseOut = 2,
    EaseInOut = 3
}
/**
 * Enum defining the different animation styles
 */
export declare enum SimpleAnimationStyle {
    Once = 0,// Play once and stop
    Loop = 1,// Loop continuously
    PingPong = 2
}
/**
 * Base component for simple animations in Wonderland Engine.
 *
 * This component provides the foundation for creating simple animations that
 * usually start as soon as an object becomes active. It handles timing, easing,
 * and different animation styles (once, loop, ping-pong).
 *
 * Derived components should override the `onLerpUpdate` method to implement
 * specific animation behaviors.
 */
export declare class SimpleAnimationBase extends Component {
    static TypeName: string;
    /**
     * Duration of the animation in seconds
     */
    duration: number;
    /**
     * The easing method to use for the animation
     */
    method: SimpleAnimationLerpType;
    /**
     * The animation style (once, loop, ping-pong)
     */
    style: SimpleAnimationStyle;
    /**
     * Delay in seconds before the animation starts
     */
    startDelay: number;
    /**
     * Whether the animation should start automatically when the component activates
     */
    autoStart: boolean;
    /**
     * Time elapsed since the animation started
     * @private
     */
    private _elapsedTime;
    /**
     * Current normalized lerp value (0-1)
     * @private
     */
    private _lerpValue;
    /**
     * Whether the animation is currently active
     * @private
     */
    private _isLerping;
    /**
     * Direction of the animation (1 = forward, -1 = backward)
     * @private
     */
    private _direction;
    /**
     * Whether the animation is currently delayed
     * @private
     */
    private _isDelayed;
    /**
     * Current delay time counter
     * @private
     */
    private _delayTimer;
    /**
     * Optional callback function that will be called when the animation completes
     * @private
     */
    private _onComplete?;
    /**
     * Called when the component is started.
     * Initializes and activates the animation if autoStart is true.
     */
    start(): void;
    /**
     * Called when the component is activated
     */
    onActivate(): void;
    /**
     * Called when the component is deactivated
     */
    onDeactivate(): void;
    /**
     * Update method called every frame.
     * Handles the animation timing and calls onLerpUpdate with the current lerp value.
     *
     * @param deltaTime - Time in seconds since the last frame
     */
    update(deltaTime: number): void;
    /**
     * Start or restart the animation
     *
     * @param onComplete - Optional callback function that will be called when the animation completes
     * @returns Reference to this component for method chaining
     */
    startLerp(onComplete?: () => void): SimpleAnimationBase;
    /**
     * Stop the animation
     *
     * @returns Reference to this component for method chaining
     */
    stopLerp(): SimpleAnimationBase;
    /**
     * Reset the animation state
     * @private
     */
    private _reset;
    /**
     * Notify completion callback if one exists
     * @private
     */
    private _notifyComplete;
    /**
     * Override this method in derived classes to implement specific animation behavior
     *
     * @param lerpValue - Current animation value (0-1) with easing applied
     * @protected
     */
    protected onLerpUpdate(lerpValue: number): void;
}
