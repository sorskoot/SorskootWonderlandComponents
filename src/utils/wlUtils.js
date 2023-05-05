import { vec3, quat } from 'gl-matrix';
import { ObjectCache } from './ObjectCache';
/**
  * @description clones the passed object
  * @param {Object} object - the object to clone
  * @param {ObjectCache} cache an optional cache to use for cloning
  * @returns {Object} the cloned object
  */
function cloneObject(object, cache) {
    if(!object || !object.parent){
        console.log("can't clone undefined object");
        return;
    }
    let cloned;

    if(cache){
        cloned = cache.getItem();
    }

    if(!cloned){                
        cloned = WL.scene.addObject(object.parent);
    }
    
    let components = object.getComponents();
    for (let i = 0; i < components.length; i++) {
        if (components[i].type == "mesh") {
            cloned.addComponent('mesh', {
                mesh: components[i].mesh,
                material: components[i].material,
                skin: components[i].skin
            });
        }
        else if (components[i].type == "collision") {
                cloned.addComponent('collision', {
                    collider: components[i].collider,
                    extents: components[i].extents,
                    group: components[i].group
                });   
        } else if (components[i].type == "animation") {
                    cloned.addComponent('animation', {
                        animation: components[i].animation,
                        state: components[i].state,
                        playCount: components[i].playCount
                    });                                            
        } else {        
            cloned.addComponent(components[i].type, components[i]);
        }
    }
    let pos = [];
    object.getTranslationLocal(pos);
    cloned.translate(pos);
    cloned.rotationLocal = object.rotationLocal;
    cloned.scalingLocal = object.scalingLocal;

    if (object.children.length > 0) {
        for (let i = 0; i < object.children.length; i++) {
            let childClone = cloneObject(object.children[i], cache);
            childClone.parent = cloned;
        }
    }
    cloned.setDirty();
    return cloned;
}

/**
* Finds a child object by name
* @param {WL.Object} object Object to get the child from 
* @param {string} childName The name of the child to find
* @returns {WL.Object} The child object; or undefined if not found
*/
function findChild(object, childName) {
    return object.children.filter(o => o.name == childName)[0];
}

/**
 * Replaces a string inside another string by index
 * @param {String} string original string to replace a character in
 * @param {Number} index the position of the start of replacement
 * @param {String} replacement the replacement string
 * @returns 
 */
function replaceAt(string, index, replacement) {
    return string.substr(0, index) + replacement + string.substr(index + replacement.length);
}

export const wlUtils = {
    cloneObject,
    findChild,    
    replaceAt
}