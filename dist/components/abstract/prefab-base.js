import { Component, RetainEmitter } from '@wonderlandengine/api';
import { wlUtils } from '../../utils/wlUtils.js';
export class PrefabsBase extends Component {
    static TypeName = 'prefabs-base';
    // Singleton
    static _instance;
    static get instance() {
        return PrefabsBase._instance;
    }
    prefabs;
    onPrefabsLoaded = new RetainEmitter();
    _isLoaded = false;
    get isLoaded() {
        return this._isLoaded;
    }
    init() {
        PrefabsBase._instance = this;
    }
    async start() {
        const s = await this.engine.loadPrefab(this.PrefabBinName);
        const r = this.engine.scene.instantiate(s);
        this.prefabs = r.root;
        this.prefabs.parent = this.object;
        wlUtils.setActive(this.prefabs, false);
        this._isLoaded = true;
        setTimeout(() => this.onPrefabsLoaded.notify(this.prefabs), 0);
    }
    /**
     * Spawns an objecy with the given name
     * @param name Name of the prefab to spawn
     * @param parent Optional parent object of the spawned object
     * @param startActive Optional boolean to set the active state of the spawned object; default is true
     * @returns The spawned object or null if spawn failed
     */
    spawn(name, parent = null, startActive = true) {
        if (!this.prefabs) {
            console.warn(`Spawning Failed. Prefabs not loaded`);
            return null;
        }
        const prefab = this.prefabs.findByName(name)[0];
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
