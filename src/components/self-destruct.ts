import {Component, Object3D} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';

export class SelfDestruct extends Component {
    static TypeName = 'self-destruct';

    /**
     * Time until the object is destroyed
     */
    @property.float(2500)
    timer = 2500;

    start() {
        setTimeout(() => {
            this.object.destroy();
        }, this.timer);
    }
}
