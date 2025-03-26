import {Component} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';
import {Easing, lerp} from '../../utils/lerp.js';

/**
 * Enum defining the different lerp types available for animations
 */
export enum SimpleAnimationLerpType {
    Linear,
    EaseIn,
    EaseOut,
    EaseInOut,
}

/**
 * Enum defining the different animation styles
 */
export enum SimpleAnimationStyle {
    Once, // Play once and stop
    Loop, // Loop continuously
    PingPong, // Play forward, then backward
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
export class SimpleAnimationBase extends Component {
    static TypeName = 'simple-animation-base';

    /**
     * Duration of the animation in seconds
     */
    @property.float(1.0)
    duration = 1.0;

    /**
     * The easing method to use for the animation
     */
    @property.enum(Object.keys(SimpleAnimationLerpType).filter((e) => isNaN(Number(e))))
    method!: SimpleAnimationLerpType;

    /**
     * The animation style (once, loop, ping-pong)
     */
    @property.enum(Object.keys(SimpleAnimationStyle).filter((e) => isNaN(Number(e))))
    style!: SimpleAnimationStyle;

    /**
     * Delay in seconds before the animation starts
     */
    @property.float(0.0)
    startDelay = 0.0;

    /**
     * Whether the animation should start automatically when the component activates
     */
    @property.bool(true)
    autoStart = true;

    /**
     * Time elapsed since the animation started
     * @private
     */
    private _elapsedTime: number = 0;

    /**
     * Current normalized lerp value (0-1)
     * @private
     */
    private _lerpValue: number = 0;

    /**
     * Whether the animation is currently active
     * @private
     */
    private _isLerping: boolean = false;

    /**
     * Direction of the animation (1 = forward, -1 = backward)
     * @private
     */
    private _direction: number = 1;

    /**
     * Whether the animation is currently delayed
     * @private
     */
    private _isDelayed: boolean = false;

    /**
     * Current delay time counter
     * @private
     */
    private _delayTimer: number = 0;

    /**
     * Optional callback function that will be called when the animation completes
     * @private
     */
    private _onComplete?: () => void;

    /**
     * Called when the component is started.
     * Initializes and activates the animation if autoStart is true.
     */
    start(): void {
        if (this.autoStart) {
            this.startLerp();
        }
    }

    /**
     * Called when the component is activated
     */
    onActivate(): void {
        // Component activation handler
    }

    /**
     * Called when the component is deactivated
     */
    onDeactivate(): void {
        // Component deactivation handler
    }

    /**
     * Update method called every frame.
     * Handles the animation timing and calls onLerpUpdate with the current lerp value.
     *
     * @param deltaTime - Time in seconds since the last frame
     */
    update(deltaTime: number): void {
        if (!this._isLerping) {
            return;
        }

        // Handle start delay
        if (this._isDelayed) {
            this._delayTimer += deltaTime;
            if (this._delayTimer >= this.startDelay) {
                this._isDelayed = false;
            }
            return;
        }

        this._elapsedTime += deltaTime * this._direction;
        this._lerpValue = this._elapsedTime / this.duration;

        if (this._lerpValue >= 1) {
            switch (this.style) {
                case SimpleAnimationStyle.Loop:
                    this._lerpValue = 0;
                    this._elapsedTime = 0;
                    break;
                case SimpleAnimationStyle.PingPong:
                    this._lerpValue = 1;
                    this._direction = -1;
                    break;
                default:
                    this._lerpValue = 1;
                    this._isLerping = false;
                    this._notifyComplete();
                    break;
            }
        } else if (this._lerpValue <= 0) {
            switch (this.style) {
                case SimpleAnimationStyle.PingPong:
                    this._lerpValue = 0;
                    this._direction = 1;
                    break;
                default:
                    this._lerpValue = 0;
                    this._isLerping = false;
                    this._notifyComplete();
                    break;
            }
        }

        let easedValue: number;
        switch (this.method) {
            case SimpleAnimationLerpType.EaseIn:
                easedValue = lerp(0, 1, this._lerpValue, Easing.InCubic);
                break;
            case SimpleAnimationLerpType.EaseOut:
                easedValue = lerp(0, 1, this._lerpValue, Easing.OutCubic);
                break;
            case SimpleAnimationLerpType.EaseInOut:
                easedValue = lerp(0, 1, this._lerpValue, Easing.InOutCubic);
                break;
            case SimpleAnimationLerpType.Linear:
            default:
                easedValue = lerp(0, 1, this._lerpValue, Easing.Linear);
                break;
        }

        this.onLerpUpdate(easedValue);
    }

    /**
     * Start or restart the animation
     *
     * @param onComplete - Optional callback function that will be called when the animation completes
     * @returns Reference to this component for method chaining
     */
    startLerp(onComplete?: () => void): SimpleAnimationBase {
        this._reset();
        this._isLerping = true;
        this._onComplete = onComplete;

        if (this.startDelay > 0) {
            this._isDelayed = true;
            this._delayTimer = 0;
        }

        return this;
    }

    /**
     * Stop the animation
     *
     * @returns Reference to this component for method chaining
     */
    stopLerp(): SimpleAnimationBase {
        this._isLerping = false;
        return this;
    }

    /**
     * Reset the animation state
     * @private
     */
    private _reset(): void {
        this._elapsedTime = 0;
        this._lerpValue = 0;
        this._direction = 1;
        this._isLerping = false;
        this._isDelayed = false;
        this._delayTimer = 0;
    }

    /**
     * Notify completion callback if one exists
     * @private
     */
    private _notifyComplete(): void {
        if (this._onComplete) {
            this._onComplete();
        }
    }

    /**
     * Override this method in derived classes to implement specific animation behavior
     *
     * @param lerpValue - Current animation value (0-1) with easing applied
     * @protected
     */
    protected onLerpUpdate(lerpValue: number): void {
        // Override this method in derived classes to perform actions during the lerp
    }
}
