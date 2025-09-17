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
 * The normal GetComponents does not work well with inheritance. This function
 * does. This function is recursive and gets all components of the given type
 * from the object and all its children.
 * @param object The object to get the components from.
 * @param type The type of component to get.
 * @returns An array of components of the given type.
 */
declare function getComponentsOfTypeRecursive<T extends Component>(object: Object3D, type: ComponentConstructor<T>): T[];
/**
 * Recursively sets the active state of the given object and all its children.
 * @param object The object to set the active state of.
 * @param active The state to set.
 */
declare function setActive(object: Object3D, active: boolean): void;
declare function destroyWithDelay(object: Object3D, delay: number): void;
/**
 * Checks if the given object has a component of the given type.
 * @param object The object to check. If a component is given, the object of the component is used.
 * @param type The component type to check for.
 * @returns True if the object has a component of the given type.
 */
declare function hasComponent(object: Object3D | Component, type: ComponentConstructor<Component>): boolean;
/**
 * Calls the specified method on every Component attached to the Object.
 *
 * A value parameter specified for a method that doesn't accept parameters is ignored.
 * If requireReceiver is set to true an error is printed if the message is not picked up by any component.
 * Note: Messages are not sent to components attached to objects that are not active.
 *
 * This functions is used to in a similar way to Unity's SendMessage function.
 * https://docs.unity3d.com/ScriptReference/GameObject.SendMessage.html
 */
export declare function sendMessage(object: Object3D, methodName: string, value?: any, requireReceiver?: boolean): void;
export declare const wlUtils: {
    cloneObject: typeof cloneObject;
    findChild: typeof findChild;
    replaceAt: typeof replaceAt;
    findComponentInParents: typeof findComponentInParents;
    setActive: typeof setActive;
    getComponentOfType: typeof getComponentOfType;
    getComponentsOfType: typeof getComponentsOfType;
    getComponentsOfTypeRecursive: typeof getComponentsOfTypeRecursive;
    destroyWithDelay: typeof destroyWithDelay;
    hasComponent: typeof hasComponent;
    sendMessage: typeof sendMessage;
};
export {};
