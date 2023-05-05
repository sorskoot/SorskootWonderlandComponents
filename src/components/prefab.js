import {Component} from '@wonderlandengine/api';

export class Prefab extends Component {
    static TypeName = 'prefab';
    static Properties = {
        name: {type: WL.Type.String},
    }
};
