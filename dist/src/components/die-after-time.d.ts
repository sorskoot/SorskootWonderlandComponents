import { Component } from '@wonderlandengine/api';
/**
 * Small helper component to destroy an object after a given time.
 * Keep in mind that if this is active at the start when it's on a prefab,
 * the object will be destroyed and spawning will fail! It should be set
 * to inactive on init.
 */
export declare class DieAfterTime extends Component {
    static TypeName: string;
    lifeTime: number;
    private _time;
    init(): void;
    start(): void;
    update(dt: number): void;
}
