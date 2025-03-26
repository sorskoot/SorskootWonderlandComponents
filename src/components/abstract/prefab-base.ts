import {Component, Object3D, RetainEmitter} from '@wonderlandengine/api';
import {wlUtils} from '../../utils/wlUtils.js';

/**
 * Abstract base class for managing prefabs in Wonderland Engine.
 * Provides functionality to load, manage, and spawn prefabs from a specified bin file.
 * Implements the singleton pattern to ensure only one instance exists.
 */
export abstract class PrefabsBase extends Component {
    static TypeName = 'prefabs-base';

    // Singleton
    private static _instance: PrefabsBase;

    /**
     * Gets the singleton instance of PrefabsBase
     */
    static get instance(): PrefabsBase {
        return PrefabsBase._instance;
    }

    /**
     * Reference to the root object containing all prefabs
     */
    private _prefabs!: Object3D;

    /**
     * Gets the root object containing all prefabs
     */
    get prefabs(): Object3D {
        return this._prefabs;
    }

    /**
     * Event emitter that notifies when prefabs are loaded
     */
    public onPrefabsLoaded = new RetainEmitter<[Object3D]>();

    /**
     * Abstract property that must be implemented by derived classes
     * to specify the name of the prefab bin file to load
     */
    protected abstract get PrefabBinName(): string;

    private _isLoaded = false;

    /**
     * Gets whether the prefabs have been loaded
     */
    get isLoaded(): boolean {
        return this._isLoaded;
    }

    /**
     * Initializes the component and sets the singleton instance
     */
    init(): void {
        PrefabsBase._instance = this;
    }

    /**
     * Loads the prefabs bin file and initializes the prefabs
     */
    async start(): Promise<void> {
        const prefabData = await this.engine.loadPrefab(this.PrefabBinName);
        const result = this.engine.scene.instantiate(prefabData);

        this._prefabs = result.root;
        this._prefabs.parent = this.object;

        wlUtils.setActive(this._prefabs, false);
        this._isLoaded = true;
        setTimeout(() => this.onPrefabsLoaded.notify(this._prefabs), 0);
    }

    /**
     * Spawns an object with the given name
     * @param name Name of the prefab to spawn
     * @param parent Optional parent object of the spawned object
     * @param startActive Optional boolean to set the active state of the spawned object; default is true
     * @returns The spawned object or null if spawn failed
     */
    spawn(
        name: string,
        parent: Object3D | null = null,
        startActive = true
    ): Object3D | null {
        if (!this._prefabs) {
            console.warn(`Spawning Failed. Prefabs not loaded`);
            return null;
        }

        const prefab = this._prefabs.findByName(name)[0];

        if (!prefab) {
            console.warn(`Spawning Failed. Prefab with name ${name} not found`);
            return null;
        }

        const clonedPrefab = prefab.clone(parent);

        if (startActive) {
            wlUtils.setActive(clonedPrefab, true);
        }

        clonedPrefab.resetPositionRotation();
        return clonedPrefab;
    }
}
