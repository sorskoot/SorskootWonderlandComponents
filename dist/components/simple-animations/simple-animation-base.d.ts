import { Component } from '@wonderlandengine/api';
export declare enum SimpleAnimationLerpType {
    Linear = 0,
    EaseIn = 1,
    EaseOut = 2,
    EaseInOut = 3
}
export declare enum SimpleAnimationStyle {
    Once = 0,
    Loop = 1,
    PingPong = 2
}
/**
 * Base component for simple animations. These animations usually are started as soon as an
 * object becones active.
 */
export declare class SimpleAnimationBase extends Component {
    static TypeName: string;
    duration: number;
    method: SimpleAnimationLerpType;
    style: SimpleAnimationStyle;
    private _elapsedTime;
    private _lerpValue;
    private _isLerping;
    start(): void;
    update(deltaTime: number): void;
    startLerp(): void;
    private _reset;
    /**
     *
     * @param lerpValue
     */
    protected onLerpUpdate(lerpValue: number): void;
}
