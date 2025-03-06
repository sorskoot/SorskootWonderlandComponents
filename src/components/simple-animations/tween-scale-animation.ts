import {property} from '@wonderlandengine/api/decorators.js';
import {SimpleAnimationBase} from './simple-animation-base.js';

export class TweenScaleAnimation extends SimpleAnimationBase {
    static TypeName = 'tween-scale-animation';
    static InheritProperties = true;

    @property.vector3(1, 1, 1)
    from: [number, number, number] = [1, 1, 1];

    @property.vector3(1, 1, 1)
    to: [number, number, number] = [1, 1, 1];

    private _startScale: [number, number, number] = [1, 1, 1];

    private _tempvec3: [number, number, number] = [0, 0, 0];

    start(): void {
        super.start();
        this.object.getScalingLocal(this._startScale);
    }

    protected override onLerpUpdate(value: number): void {
        for (let i = 0; i < 3; i++) {
            this._tempvec3[i] =
                this._startScale[i] * ((1 - value) * this.from[i] + value * this.to[i]);
        }
        this.object.setScalingLocal(this._tempvec3);
    }
}
