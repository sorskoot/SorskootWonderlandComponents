import { Component, Object3D, RetainEmitter } from '@wonderlandengine/api';
export declare abstract class PrefabsBase extends Component {
    static TypeName: string;
    private static _instance;
    static get instance(): PrefabsBase;
    prefabs: Object3D;
    onPrefabsLoaded: RetainEmitter<[Object3D]>;
    abstract get PrefabBinName(): string;
    private _isLoaded;
    get isLoaded(): boolean;
    init(): void;
    start(): Promise<void>;
    /**
     * Spawns an objecy with the given name
     * @param name Name of the prefab to spawn
     * @param parent Optional parent object of the spawned object
     * @param startActive Optional boolean to set the active state of the spawned object; default is true
     * @returns The spawned object or null if spawn failed
     */
    spawn(name: string, parent?: Object3D | null, startActive?: boolean): Object3D | null;
}
