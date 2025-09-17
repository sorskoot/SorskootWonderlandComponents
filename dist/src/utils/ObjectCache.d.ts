import { Object3D, WonderlandEngine } from "@wonderlandengine/api";
export declare class ObjectCache {
    #private;
    engine: WonderlandEngine;
    name: string;
    cacheSize: number;
    index: number;
    /**
     *
     * @param {WonderlandEngine} engine
     * @param {string} name
     * @param {number} cacheSize
     * @param {Object3D} parent
     * @param {number} components
     */
    constructor(engine: WonderlandEngine, name: string, cacheSize: number, parent: Object3D, components: number);
    reset(): void;
    getItem(): Object3D | undefined;
}
