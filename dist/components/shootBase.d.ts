import { Component } from '@wonderlandengine/api';
export declare class ShootBase extends Component {
    static TypeName: string;
    haptics: boolean;
    handedness: number;
    initialized: boolean;
    start(): void;
    pulse(gamepad: Gamepad | undefined): void;
    shoot(transform: Float32Array | number[], rotation: Float32Array | number[]): void;
}
