import { SimpleAnimationBase } from './simple-animation-base.js';
export declare class TweenScaleAnimation extends SimpleAnimationBase {
    static TypeName: string;
    static InheritProperties: boolean;
    from: [number, number, number];
    to: [number, number, number];
    private _startScale;
    private _tempvec3;
    start(): void;
    protected onLerpUpdate(value: number): void;
}
