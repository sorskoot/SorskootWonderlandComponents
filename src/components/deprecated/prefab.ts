import {Component} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';

/**
 * @depricated Use Prefered Wonderland way
 */
export class Prefab extends Component {
    static TypeName = 'prefab';

    @property.string()
    name!: string;
}
