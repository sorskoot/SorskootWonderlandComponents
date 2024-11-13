import { Component } from '@wonderlandengine/api';
export declare class SelfDestruct extends Component {
    static TypeName: string;
    /**
     * Time until the object is destroyed
     */
    timer: number;
    start(): void;
}
