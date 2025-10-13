var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ObjectCache_objects;
export class ObjectCache {
    /**
     *
     * @param {WonderlandEngine} engine
     * @param {string} name
     * @param {number} cacheSize
     * @param {Object3D} parent
     * @param {number} components
     */
    constructor(engine, name, cacheSize, parent, components) {
        _ObjectCache_objects.set(this, void 0);
        this.engine = engine;
        this.name = name;
        console.log(`creating cache: ${name} with ${cacheSize} elements`);
        this.cacheSize = cacheSize;
        __classPrivateFieldSet(this, _ObjectCache_objects, this.engine.scene.addObjects(cacheSize, parent, components), "f");
        this.index = 0;
    }
    reset() {
        this.index = 0;
        __classPrivateFieldGet(this, _ObjectCache_objects, "f").forEach(obj => {
            obj.getComponents().forEach(c => {
                c.active = false;
            });
            obj.parent = null;
            obj.resetPositionRotation();
        });
    }
    getItem() {
        if (this.index >= this.cacheSize) {
            console.warn(`Cache ${this.name} ran out of space`);
            return;
        }
        let obj = __classPrivateFieldGet(this, _ObjectCache_objects, "f")[this.index];
        this.index++;
        return obj;
    }
}
_ObjectCache_objects = new WeakMap();
