import { Component, } from '@wonderlandengine/api';
/**
  * @description clones the passed object
   @param {WonderlandEngine} engine - the engine
  * @param {Object3D} object - the object to clone
  * @param {ObjectCache} cache an optional cache to use for cloning
  * @returns {Object3D} the cloned object
  *
  * @depricated use Object3D.clone instead
  */
export function cloneObject(engine, object, cache) {
    if (!object || !object.parent) {
        console.log("can't clone undefined object");
        return;
    }
    return object.clone(object.parent);
}
/**
 * Finds a child object by name
 * @param {Object3D} object Object to get the child from
 * @param {string} childName The name of the child to find
 * @returns {Object3D} The child object; or undefined if not found
 */
function findChild(object, childName) {
    return object.children.filter((o) => o.name == childName)[0];
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
/**
 * Gets a component from a parent object
 * @param {ComponentConstructor<T>} typeOrClass The type or class of the component to find
 * @param {Object3D} object The object to get the component from
 * @returns {T|null} The component; or null if not found
 */
function findComponentInParents(typeOrClass, object) {
    const component = object.getComponent(typeOrClass);
    if (component) {
        return component;
    }
    if (object.parent == null) {
        return null;
    }
    return findComponentInParents(typeOrClass, object.parent);
}
/**
 * The normal GetComponents does not work well with inheritance. This function
 * does.
 * @param object The object to get the components from.
 * @param type The type of component to get.
 * @returns An array of components of the given type.
 */
function getComponentsOfType(object, type) {
    return object.getComponents().filter((c) => c instanceof type);
}
function getComponentOfType(object, type) {
    return getComponentsOfType(object, type)[0];
}
/**
 * The normal GetComponents does not work well with inheritance. This function
 * does. This function is recursive and gets all components of the given type
 * from the object and all its children.
 * @param object The object to get the components from.
 * @param type The type of component to get.
 * @returns An array of components of the given type.
 */
function getComponentsOfTypeRecursive(object, type) {
    const result = [];
    const components = object.getComponents().filter((c) => c instanceof type);
    result.push(...components);
    for (const child of object.children) {
        result.push(...getComponentsOfTypeRecursive(child, type));
    }
    return result;
}
/**
 * Recursively sets the active state of the given object and all its children.
 * @param object The object to set the active state of.
 * @param active The state to set.
 */
function setActive(object, active) {
    object.active = active;
    object.getComponents().forEach((c) => (c.active = active));
    object.children.forEach((c) => setActive(c, active));
}
function destroyWithDelay(object, delay) {
    setTimeout(() => {
        if (object) {
            // ignore if there's no object anymore.
            if (object.isDestroyed) {
                // ignore if the object is already destroyed.
                return;
            }
            object.destroy();
        }
    }, delay);
}
/**
 * Checks if the given object has a component of the given type.
 * @param object The object to check. If a component is given, the object of the component is used.
 * @param type The component type to check for.
 * @returns True if the object has a component of the given type.
 */
function hasComponent(object, type) {
    if (object instanceof Component) {
        object = object.object;
    }
    return object.getComponents().some((c) => c instanceof type);
}
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
export function sendMessage(object, methodName, value, requireReceiver = true) {
    let isCalled = false;
    const components = object.getComponents(Component);
    for (const component of components) {
        if (component.active) {
            const method = component[methodName];
            if (method && typeof method === 'function') {
                method.call(component, value);
                isCalled = true;
            }
        }
    }
    if (requireReceiver && !isCalled) {
        console.warn(`No receiver found for message '${methodName}' on object '${object.name}'`);
    }
}
export const wlUtils = {
    cloneObject,
    findChild,
    replaceAt,
    findComponentInParents,
    setActive,
    getComponentOfType,
    getComponentsOfType,
    getComponentsOfTypeRecursive,
    destroyWithDelay,
    hasComponent,
    sendMessage,
};
