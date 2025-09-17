import { Component, Object3D, RetainEmitter } from '@wonderlandengine/api';
/**
 * Abstract base class for managing prefabs in Wonderland Engine.
 * Provides functionality to load, manage, and spawn prefabs from a specified bin file.
 */
export declare abstract class PrefabsBase extends Component {
    static TypeName: string;
    /**
     * Reference to the root object containing all prefabs
     */
    private _prefabs;
    /**
     * Gets the root object containing all prefabs
     */
    get prefabs(): Object3D;
    /**
     * Event emitter that notifies when prefabs are loaded
     */
    onPrefabsLoaded: RetainEmitter<[Object3D]>;
    /**
     * Abstract property that must be implemented by derived classes
     * to specify the name of the prefab bin file to load
     */
    protected abstract PrefabBinName(): string;
    private _isLoaded;
    /**
     * Gets whether the prefabs have been loaded
     */
    get isLoaded(): boolean;
    /**
     * Loads the prefabs bin file and initializes the prefabs
     */
    start(): Promise<void>;
    /**
     * Spawns an object with the given name
     * @param name Name of the prefab to spawn
     * @param parent Optional parent object of the spawned object
     * @param startActive Optional boolean to set the active state of the spawned object; default is true
     * @returns The spawned object or null if spawn failed
     */
    spawn(name: string, parent?: Object3D | null, startActive?: boolean): Object3D | null;
}
