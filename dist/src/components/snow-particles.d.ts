import { Component, Mesh, Material } from '@wonderlandengine/api';
export declare class SnowParticles extends Component {
    #private;
    static TypeName: string;
    mesh: Mesh;
    material: Material;
    delay: number;
    maxParticles: number;
    initialSpeed: number;
    particleScale: number;
    size: number;
    time: number;
    count: number;
    start(): void;
    update(dt: number): void;
    /** Spawn a particle */
    spawn(): void;
}
