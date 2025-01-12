import { SimpleAnimationBase } from './simple-animation-base.js';
export declare class TweenPositionAnimation extends SimpleAnimationBase {
    static TypeName: string;
    static InheritProperties: boolean;
    from: number[];
    to: number[];
    private _startPosition;
    start(): void;
    onLerpUpdate(value: number): void;
}
