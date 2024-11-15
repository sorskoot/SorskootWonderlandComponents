import { ObjectCache } from './ObjectCache.js';
import { Object3D, WonderlandEngine, ComponentConstructor, Component } from '@wonderlandengine/api';
/**
  * @description clones the passed object
   @param {WonderlandEngine} engine - the engine
  * @param {Object3D} object - the object to clone
  * @param {ObjectCache} cache an optional cache to use for cloning
  * @returns {Object3D} the cloned object
  *
  * @depricated use Object3D.clone instead
  */
export declare function cloneObject(engine: WonderlandEngine, object: Object3D, cache: ObjectCache): Object3D | undefined;
/**
 * Finds a child object by name
 * @param {Object3D} object Object to get the child from
 * @param {string} childName The name of the child to find
 * @returns {Object3D} The child object; or undefined if not found
 */
declare function findChild(object: Object3D, childName: string): Object3D;
/**
 * Replaces a string inside another string by index
 * @param {String} string original string to replace a character in
 * @param {Number} index the position of the start of replacement
 * @param {String} replacement the replacement string
 * @returns
 */
declare function replaceAt(string: string, index: number, replacement: string): string;
/**
 * Gets a component from a parent object
 * @param {ComponentConstructor<T>} typeOrClass The type or class of the component to find
 * @param {Object3D} object The object to get the component from
 * @returns {T|null} The component; or null if not found
 */
declare function findComponentInParents<T extends Component>(typeOrClass: ComponentConstructor<T>, object: Object3D): T | null;
/**
 * The normal GetComponents does not work well with inheritance. This function
 * does.
 * @param object The object to get the components from.
 * @param type The type of component to get.
 * @returns An array of components of the given type.
 */
declare function getComponentsOfType<T extends Component>(object: Object3D, type: ComponentConstructor<T>): T[];
declare function getComponentOfType<T extends Component>(object: Object3D, type: ComponentConstructor<T>): T;
/**
 * Recursively sets the active state of the given object and all its children.
 * @param object The object to set the active state of.
 * @param active The state to set.
 */
declare function setActive(object: Object3D, active: boolean): void;
declare function destroyWithDelay(object: Object3D, delay: number): void;
export declare const wlUtils: {
    cloneObject: typeof cloneObject;
    findChild: typeof findChild;
    replaceAt: typeof replaceAt;
    findComponentInParents: typeof findComponentInParents;
    setActive: typeof setActive;
    getComponentOfType: typeof getComponentOfType;
    getComponentsOfType: typeof getComponentsOfType;
    destroyWithDelay: typeof destroyWithDelay;
};
export {};
