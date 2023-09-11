import { ObjectCache } from "./ObjectCache.js";
import { Object3D, WonderlandEngine } from "@wonderlandengine/api";
/**
  * @description clones the passed object
   @param {WonderlandEngine} engine - the engine
  * @param {Object3D} object - the object to clone
  * @param {ObjectCache} cache an optional cache to use for cloning
  * @returns {Object3D} the cloned object
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
export declare const wlUtils: {
    cloneObject: typeof cloneObject;
    findChild: typeof findChild;
    replaceAt: typeof replaceAt;
};
export {};
