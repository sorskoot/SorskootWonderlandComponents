import { Component } from '@wonderlandengine/api';
/**
 * Component that destroys its object after a specified time
 */
export declare class SelfDestruct extends Component {
    static TypeName: string;
    /**
     * Time in seconds after which the object will be destroyed
     */
    lifeTime: number;
    /** Tracks elapsed time since component activation */
    private _time;
    /**
     * Validates component properties on start
     */
    start(): void;
    /**
     * Updates elapsed time and destroys object when lifetime is reached
     * @param dt Delta time in seconds
     */
    update(dt: number): void;
}
