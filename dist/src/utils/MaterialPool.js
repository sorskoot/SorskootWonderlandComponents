/**
 * MaterialPool manages a cache of materials to avoid recreating them.
 * Implements the singleton pattern to ensure only one instance exists.
 */
export class MaterialPool {
    static _instance;
    _materials = new Map();
    constructor() { }
    /**
     * Returns the singleton instance of MaterialPool
     */
    static get instance() {
        if (!MaterialPool._instance) {
            MaterialPool._instance = new MaterialPool();
        }
        return MaterialPool._instance;
    }
    /**
     * Gets a material from the pool or creates and stores it if it doesn't exist
     *
     * @param name - Unique identifier for the material
     * @param createMaterial - Function that creates the material if it doesn't exist in the pool
     * @returns The requested material
     */
    getOrSetMaterial(name, createMaterial) {
        if (!this._materials.has(name)) {
            const material = createMaterial();
            this._materials.set(name, material);
        }
        return this._materials.get(name);
    }
}
