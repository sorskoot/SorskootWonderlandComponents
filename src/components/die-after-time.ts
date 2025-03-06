import {Component} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';

/**
 * Small helper component to destroy an object after a given time.
 * Keep in mind that if this is active at the start when it's on a prefab,
 * the object will be destroyed and spawning will fail! It should be set
 * to inactive on init.
 */
export class DieAfterTime extends Component {
    static TypeName = 'die-after-time';

    @property.float(1.0)
    lifeTime = 1.0;

    private _time: number = 0;

    init(): void {
        this.active = false;
    }

    start(): void {}

    update(dt: number): void {
        this._time += dt;
        if (!this.object.isDestroyed && this._time > this.lifeTime) {
            this.object.destroy();
        }
    }
}
