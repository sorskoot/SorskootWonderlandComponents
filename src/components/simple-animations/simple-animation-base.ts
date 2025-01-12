import {Component, Object3D} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';
import {Easing, lerp} from '../../utils/lerp.js';

export enum SimpleAnimationLerpType {
    Linear,
    EaseIn,
    EaseOut,
    EaseInOut,
}

export enum SimpleAnimationStyle {
    Once,
    Loop,
    PingPong,
}

/**
 * Base component for simple animations. These animations usually are started as soon as an
 * object becones active.
 */
export class SimpleAnimationBase extends Component {
    static TypeName = 'simple-animation-base';
    @property.float(1.0)
    duration = 1.0;

    @property.enum(Object.keys(SimpleAnimationLerpType).filter((e) => isNaN(Number(e))))
    method!: SimpleAnimationLerpType;

    @property.enum(Object.keys(SimpleAnimationStyle).filter((e) => isNaN(Number(e))))
    style!: SimpleAnimationStyle;

    private _elapsedTime: number = 0;
    private _lerpValue: number = 0;
    private _isLerping: boolean = false;

    start(): void {
        this._reset();
        this._isLerping = true;
    }

    update(deltaTime: number): void {
        if (!this._isLerping) {
            return;
        }

        this._elapsedTime += deltaTime;
        this._lerpValue = this._elapsedTime / this.duration;

        if (this._lerpValue >= 1) {
            switch (this.style) {
                case SimpleAnimationStyle.Loop:
                    this._lerpValue = 0;
                    this._elapsedTime = 0;
                    break;
                case SimpleAnimationStyle.PingPong:
                    console.log('PingPong not implemented yet');
                default:
                    this._lerpValue = 1;
                    this._isLerping = false;
                    break;
            }
        }
        switch (this.method) {
            case SimpleAnimationLerpType.EaseIn:
                this.onLerpUpdate(lerp(0, 1, this._lerpValue, Easing.InCubic));
                break;
            case SimpleAnimationLerpType.EaseOut:
                this.onLerpUpdate(lerp(0, 1, this._lerpValue, Easing.OutCubic));
                break;
            case SimpleAnimationLerpType.EaseInOut:
                this.onLerpUpdate(lerp(0, 1, this._lerpValue, Easing.InOutCubic));
                break;
            case SimpleAnimationLerpType.Linear:
            default:
                this.onLerpUpdate(lerp(0, 1, this._lerpValue, Easing.Linear));
                break;
        }
    }

    startLerp(): void {
        this._reset();
        this._isLerping = true;
    }

    private _reset(): void {
        this._elapsedTime = 0;
        this._lerpValue = 0;
        this._isLerping = false;
    }

    /**
     *
     * @param lerpValue
     */
    protected onLerpUpdate(lerpValue: number): void {
        // Override this method in derived classes to perform actions during the lerp
    }
}
