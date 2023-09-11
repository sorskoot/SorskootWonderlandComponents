export class ObjectCache {
    #objects;
    engine;
    name;
    cacheSize;
    index;
    /**
     *
     * @param {WonderlandEngine} engine
     * @param {string} name
     * @param {number} cacheSize
     * @param {Object3D} parent
     * @param {number} components
     */
    constructor(engine, name, cacheSize, parent, components) {
        this.engine = engine;
        this.name = name;
        console.log(`creating cache: ${name} with ${cacheSize} elements`);
        this.cacheSize = cacheSize;
        this.#objects = this.engine.scene.addObjects(cacheSize, parent, components);
        this.index = 0;
    }
    reset() {
        this.index = 0;
        this.#objects.forEach(obj => {
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
        let obj = this.#objects[this.index];
        this.index++;
        return obj;
    }
}
