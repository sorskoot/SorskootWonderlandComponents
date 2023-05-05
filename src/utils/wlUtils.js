import { vec3, quat } from 'gl-matrix';
import { ObjectCache } from './ObjectCache';
import { Object3D, WonderlandEngine } from '@wonderlandengine/api';

/**
  * @description clones the passed object
   @param {WonderlandEngine} engine - the engine
  * @param {Object3D} object - the object to clone
  * @param {ObjectCache} cache an optional cache to use for cloning
  * @returns {Object3D} the cloned object
  */
export function cloneObject(engine, object, cache) {
    if (!object || !object.parent) {
        console.log("can't clone undefined object");
        return;        
    }

    /**
     * @type {Object3D} the object that is cloned
     */
    let cloned;

    if (cache) {
        cloned = cache.getItem();
    }

    if (!cloned) {
        cloned = engine.scene.addObject(object.parent);
    }

    let components = object.getComponents();
    for (let i = 0; i < components.length; i++) {
        const comp = cloned.getComponents();

        if (components[i].type == "mesh") {
            const m = comp.find(c => c.type == 'mesh' && c.active == false);
            if (m) {
                m.mesh = components[i].mesh;
                m.material = components[i].material;
                m.skin = components[i].skin;
                m.active = true;
            } else {
                cloned.addComponent('mesh', {
                    mesh: components[i].mesh,
                    material: components[i].material,
                    skin: components[i].skin
                });
            }
        }
        if (components[i].type == "mesh") {
            const m = comp.find(c => c.type == 'mesh' && c.active == false);
            if (m) {
                m.mesh = components[i].mesh;
                m.material = components[i].material;
                m.skin = components[i].skin;
                m.active = true;
            } else {
                cloned.addComponent('mesh', {
                    mesh: components[i].mesh,
                    material: components[i].material,
                    skin: components[i].skin
                });
            }
        }
        // else if (components[i].type == "mesh-particles") {
        //     const c = comp.find(c => c.type == 'mesh-particles' && c.active == false);
        //     if (c) {
        //         c.mesh = components[i].mesh;
        //         c.material = components[i].material;
        //         c.delay = components[i].delay;
        //         c.maxParticles = components[i].maxParticles;
        //         c.initialSpeed = components[i].initialSpeed;
        //         c.particleScale = components[i].particleScale;
        //         c.spread = components[i].spread;
        //         c.active = true;
        //     } else {
        //         cloned.addComponent('mesh-particles', {
        //             mesh: components[i].mesh,
        //             material: components[i].material,
        //             delay: components[i].delay,
        //             maxParticles: components[i].maxParticles,
        //             initialSpeed: components[i].initialSpeed,
        //             particleScale: components[i].particleScale,
        //             spread: components[i].spread
        //         });
        //     }
        // }
        else if (components[i].type == "collision") {
            const c = comp.find(c => c.type == 'collision' && c.active == false);
            if (c) {
                c.collider = components[i].collider;
                c.extents = components[i].extents;
                c.group = components[i].group;
                c.active = true;
            } else {
                cloned.addComponent('collision', {
                    collider: components[i].collider,
                    extents: components[i].extents,
                    group: components[i].group
                });
            }
        } else if (components[i].type == "animation") {
            const c = comp.find(c => c.type == 'animation' && c.active == false);
            if (c) {
                c.animation = components[i].animation;
                c.state = components[i].state;
                c.playCount = components[i].playCount;
                c.active = true;
            } else
                cloned.addComponent('animation', {
                    animation: components[i].animation,
                    state: components[i].state,
                    playCount: components[i].playCount
                });
        } else if (components[i].type == "tags") {
            const c = comp.find(c => c.type == 'tags' && c.active == false);
            if (c) {
                c.tags = components[i].tags;
                c.active = true;
            } else
                cloned.addComponent('tags',
                    {
                        tags: components[i].tags
                    });
        } else if (components[i].type == "flipbook") {
            const c = comp.find(c => c.type == 'flipbook' && c.active == false);
            if (c) {
                base: components[i].base,
                    c.url = components[i].url;
                c.urlEmissive = components[i].urlEmissive;
                c.columns = components[i].columns;
                c.rows = components[i].rows;
                c.speed = components[i].speed;
                c.active = true;
            } else
                cloned.addComponent('flipbook',
                    {
                        base: components[i].base,
                        url: components[i].url,
                        urlEmissive: components[i].urlEmissive,
                        columns: components[i].columns,
                        rows: components[i].rows,
                        speed: components[i].speed
                    });
        } else {
            // var c = JSON.parse(JSON.stringify(components[i]))
            // delete(c,'_id');
            // delete(c,'_manager');
            // delete(c,'_type');
            // cloned.addComponent(components[i].type, c);
        }
    }
    let pos = [];
    let rot = [];
    let scale = [];
    object.getPositionLocal(pos);
    object.getRotationLocal(rot);
    object.getScalingLocal(scale);
    cloned.resetPositionRotation();
    cloned.setPositionLocal(pos);
    cloned.setRotationLocal(rot);
    cloned.setScalingLocal(scale);
    
    cloned.name = object.name;
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
* @param {Object3D} object Object to get the child from 
* @param {string} childName The name of the child to find
* @returns {Object3D} The child object; or undefined if not found
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
    return string.slice(0, index) + replacement + string.slice(index + replacement.length);
}

export const wlUtils = {
    cloneObject,
    findChild,    
    replaceAt
}