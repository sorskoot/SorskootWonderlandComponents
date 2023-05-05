export class ObjectCache {
    constructor(name, cacheSize, parent, components) {
        this.name = name;
        this.cacheSize = cacheSize;
        this._objects = WL.scene.addObjects(cacheSize, parent, components);
        this.index = 0;
    }

    /**
     * Gets an object from the object pool.
     * @returns {Object} A reusable object.
     */
    getItem() {
        if (this.index >= this.cacheSize) {
            console.warn(`Cache ${this.name} ran out of space`);
            return;
        }
        let obj = this._objects[this.index];
        this.index++;
        return obj;
    }
}
