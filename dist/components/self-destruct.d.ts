import { Component } from '@wonderlandengine/api';
export declare class SelfDestruct extends Component {
    static TypeName: string;
    lifeTime: number;
    private _time;
    start(): void;
    update(dt: number): void;
}
