import { Material } from '@wonderlandengine/api';
/**
 * MaterialPool manages a cache of materials to avoid recreating them.
 * Implements the singleton pattern to ensure only one instance exists.
 */
export declare class MaterialPool {
    private static _instance;
    private _materials;
    private constructor();
    /**
     * Returns the singleton instance of MaterialPool
     */
    static get instance(): MaterialPool;
    /**
     * Gets a material from the pool or creates and stores it if it doesn't exist
     *
     * @param name - Unique identifier for the material
     * @param createMaterial - Function that creates the material if it doesn't exist in the pool
     * @returns The requested material
     */
    getOrSetMaterial<T extends Material>(name: string, createMaterial: () => T): T;
}
