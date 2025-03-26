import {Component} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';

/**
 * Component that destroys its object after a specified time
 */
export class SelfDestruct extends Component {
    static TypeName = 'self-destruct';

    /**
     * Time in seconds after which the object will be destroyed
     */
    @property.float(1.0)
    lifeTime = 1.0;

    /** Tracks elapsed time since component activation */
    private _time: number = 0;

    /**
     * Validates component properties on start
     */
    start(): void {
        if (this.lifeTime <= 0) {
            throw new Error('self-destruct: lifeTime must be greater than 0');
        }
    }

    /**
     * Updates elapsed time and destroys object when lifetime is reached
     * @param dt Delta time in seconds
     */
    update(dt: number): void {
        this._time += dt;
        if (!this.object.isDestroyed && this._time > this.lifeTime) {
            this.object.destroy();
        }
    }
}
