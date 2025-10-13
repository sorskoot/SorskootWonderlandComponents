var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@wonderlandengine/api';
import { property } from '@wonderlandengine/api/decorators.js';
import { Easing, lerp } from '../../utils/lerp.js';
/**
 * Enum defining the different lerp types available for animations
 */
export var SimpleAnimationLerpType;
(function (SimpleAnimationLerpType) {
    SimpleAnimationLerpType[SimpleAnimationLerpType["Linear"] = 0] = "Linear";
    SimpleAnimationLerpType[SimpleAnimationLerpType["EaseIn"] = 1] = "EaseIn";
    SimpleAnimationLerpType[SimpleAnimationLerpType["EaseOut"] = 2] = "EaseOut";
    SimpleAnimationLerpType[SimpleAnimationLerpType["EaseInOut"] = 3] = "EaseInOut";
})(SimpleAnimationLerpType || (SimpleAnimationLerpType = {}));
/**
 * Enum defining the different animation styles
 */
export var SimpleAnimationStyle;
(function (SimpleAnimationStyle) {
    SimpleAnimationStyle[SimpleAnimationStyle["Once"] = 0] = "Once";
    SimpleAnimationStyle[SimpleAnimationStyle["Loop"] = 1] = "Loop";
    SimpleAnimationStyle[SimpleAnimationStyle["PingPong"] = 2] = "PingPong";
})(SimpleAnimationStyle || (SimpleAnimationStyle = {}));
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
    constructor() {
        super(...arguments);
        /**
         * Duration of the animation in seconds
         */
        this.duration = 1.0;
        /**
         * Delay in seconds before the animation starts
         */
        this.startDelay = 0.0;
        /**
         * Whether the animation should start automatically when the component activates
         */
        this.autoStart = true;
        /**
         * Time elapsed since the animation started
         * @private
         */
        this._elapsedTime = 0;
        /**
         * Current normalized lerp value (0-1)
         * @private
         */
        this._lerpValue = 0;
        /**
         * Whether the animation is currently active
         * @private
         */
        this._isLerping = false;
        /**
         * Direction of the animation (1 = forward, -1 = backward)
         * @private
         */
        this._direction = 1;
        /**
         * Whether the animation is currently delayed
         * @private
         */
        this._isDelayed = false;
        /**
         * Current delay time counter
         * @private
         */
        this._delayTimer = 0;
    }
    /**
     * Called when the component is started.
     * Initializes and activates the animation if autoStart is true.
     */
    start() {
        if (this.autoStart) {
            this.startLerp();
        }
    }
    /**
     * Called when the component is activated
     */
    onActivate() {
        // Component activation handler
    }
    /**
     * Called when the component is deactivated
     */
    onDeactivate() {
        // Component deactivation handler
    }
    /**
     * Update method called every frame.
     * Handles the animation timing and calls onLerpUpdate with the current lerp value.
     *
     * @param deltaTime - Time in seconds since the last frame
     */
    update(deltaTime) {
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
        }
        else if (this._lerpValue <= 0) {
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
        let easedValue;
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
    startLerp(onComplete) {
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
    stopLerp() {
        this._isLerping = false;
        return this;
    }
    /**
     * Reset the animation state
     * @private
     */
    _reset() {
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
    _notifyComplete() {
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
    onLerpUpdate(lerpValue) {
        // Override this method in derived classes to perform actions during the lerp
    }
}
SimpleAnimationBase.TypeName = 'simple-animation-base';
__decorate([
    property.float(1.0)
], SimpleAnimationBase.prototype, "duration", void 0);
__decorate([
    property.enum(Object.keys(SimpleAnimationLerpType).filter((e) => isNaN(Number(e))))
], SimpleAnimationBase.prototype, "method", void 0);
__decorate([
    property.enum(Object.keys(SimpleAnimationStyle).filter((e) => isNaN(Number(e))))
], SimpleAnimationBase.prototype, "style", void 0);
__decorate([
    property.float(0.0)
], SimpleAnimationBase.prototype, "startDelay", void 0);
__decorate([
    property.bool(true)
], SimpleAnimationBase.prototype, "autoStart", void 0);
