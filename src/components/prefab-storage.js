import {Component, Object3D} from '@wonderlandengine/api';

export class PrefabStorage extends Component {
    static TypeName = 'prefab-storage';
    static Properties = {
    }

    constructor(){
        this.prefabs={};
    }  

    start() {
        let children = this.object.children;
        for (let i = 0; i < children.length; i++){
            let child = children[i];
            let childPrefab = child.getComponent('prefab');
            if(childPrefab){
                this.prefabs[childPrefab.name] = child;
                child.setPositionWorld([-1000,-1000,-1000]);         
            }
        }
    }

    /**
     * Instantiate a prefab.
     * 
     * @param {string} prefabName Name of the prefab to instantiate.
     * @param {Object3D} parentObject The object to parent the prefab to after instantiation.
     * @returns {Object3D} The root of the instantiated prefab.
     */
    instantiate(prefabName, parentObject){
        let prefab = this.prefabs[prefabName];
        if(!prefab){
            console.error('trying to create '+prefabName+' but that is not a registerd prefab');
            return;
        }                

        
        let obj =  this.engine.scene.addObject(parentObject);
        obj.name = prefabName;
        // var temp = [0, 0, 0];
        // prefab.getTranslationWorld(temp);
        // obj.setTranslationWorld(temp);        
        obj.scaleLocal(prefab.scalingLocal);
        obj.setTransformLocal(prefab.transformLocal);        
        
        var prefabMesh = prefab.getComponent('mesh');
        if(prefabMesh){
            let newMesh = obj.addComponent('mesh');
            newMesh.mesh = prefabMesh.mesh;
            newMesh.material = prefabMesh.material;
        }
        var prefabCollision = prefab.getComponent('collision');
        if(prefabCollision){
            let newCollision = obj.addComponent('collision');
            newCollision.collider = prefabCollision.collider;
            newCollision.extents = prefabCollision.extents;
            newCollision.group = prefabCollision.group;
        }
        obj.setDirty();
        return obj;
    }
};