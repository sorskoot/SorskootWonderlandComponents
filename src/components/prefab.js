import {Component, Property} from '@wonderlandengine/api';

export class Prefab extends Component {
    static TypeName = 'prefab';
    static Properties = {
        name: Property.string(),
    }
};
