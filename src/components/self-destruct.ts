import {Component, Object3D} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';

export class SelfDestruct extends Component {
    static TypeName = 'self-destruct';

    @property.float(1.0)
    lifeTime = 1.0;

    private _time: number = 0;
    start(): void {}

    update(dt: number): void {
        this._time += dt;
        if (!this.object.isDestroyed && this._time > this.lifeTime) {
            this.object.destroy();
        }
    }
}
