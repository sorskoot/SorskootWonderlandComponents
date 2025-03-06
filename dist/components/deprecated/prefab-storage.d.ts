import { Component, Object3D } from '@wonderlandengine/api';
/**
 * @depricated Use Prefered Wonderland way
 */
export declare class PrefabStorage extends Component {
    static TypeName: string;
    prefabs: {
        [key: string]: Object3D;
    };
    start(): void;
    /**
     * Instantiate a prefab.
     *
     * @param {string} prefabName Name of the prefab to instantiate.
     * @param {Object3D} parentObject The object to parent the prefab to after instantiation.
     * @returns {Object3D|undefined} The root of the instantiated prefab.
     */
    instantiate(prefabName: string, parentObject: Object3D): Object3D | undefined;
}
