import {property} from '@wonderlandengine/api/decorators.js';
import {SimpleAnimationBase} from './simple-animation-base.js';

const tempvec3 = [0, 0, 0];

export class TweenPositionAnimation extends SimpleAnimationBase {
    static TypeName = 'tween-position-animation';
    static InheritProperties = true;

    @property.vector3(0, 0, 0)
    from = [0, 0, 0];

    @property.vector3(0, 0, 0)
    to = [0, 0, 0];

    private _startPosition = [0, 0, 0];

    start(): void {
        super.start();
        this.object.getPositionLocal(this._startPosition);
    }

    override onLerpUpdate(value: number) {
        for (let i = 0; i < 3; i++) {
            tempvec3[i] =
                this._startPosition[i] + this.from[i] * (1 - value) + this.to[i] * value;
        }
        this.object.setPositionLocal(tempvec3);
    }
}
