import { Component, MeshComponent, CollisionComponent, } from '@wonderlandengine/api';
import { Prefab } from './prefab.js';
/**
 * @depricated Use Prefered Wonderland way
 */
export class PrefabStorage extends Component {
    static TypeName = 'prefab-storage';
    prefabs = {};
    start() {
        let children = this.object.children;
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            let childPrefab = child.getComponent(Prefab);
            if (childPrefab) {
                this.prefabs[childPrefab.name] = child;
                child.setPositionWorld([-1000, -1000, -1000]);
            }
        }
    }
    /**
     * Instantiate a prefab.
     *
     * @param {string} prefabName Name of the prefab to instantiate.
     * @param {Object3D} parentObject The object to parent the prefab to after instantiation.
     * @returns {Object3D|undefined} The root of the instantiated prefab.
     */
    instantiate(prefabName, parentObject) {
        let prefab = this.prefabs[prefabName];
        if (!prefab) {
            console.error('trying to create ' + prefabName + ' but that is not a registerd prefab');
            return;
        }
        let obj = this.engine.scene.addObject(parentObject);
        obj.name = prefabName;
        obj.scaleLocal(prefab.getScalingLocal());
        obj.setTransformLocal(prefab.getTransformLocal());
        var prefabMesh = prefab.getComponent(MeshComponent);
        if (prefabMesh) {
            let newMesh = obj.addComponent(MeshComponent);
            if (!newMesh) {
                console.error('mesh component could not be added to object');
                return;
            }
            newMesh.mesh = prefabMesh.mesh;
            newMesh.material = prefabMesh.material;
        }
        var prefabCollision = prefab.getComponent(CollisionComponent);
        if (prefabCollision) {
            let newCollision = obj.addComponent(CollisionComponent);
            if (!newCollision) {
                console.error('collision component could not be added to object');
                return;
            }
            newCollision.collider = prefabCollision.collider;
            newCollision.extents = prefabCollision.extents;
            newCollision.group = prefabCollision.group;
        }
        obj.setDirty();
        return obj;
    }
}
