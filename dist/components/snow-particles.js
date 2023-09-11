var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, MeshComponent } from '@wonderlandengine/api';
import { property } from "@wonderlandengine/api/decorators.js";
import { quat2, vec3 } from 'gl-matrix';
export class SnowParticles extends Component {
    static TypeName = 'snow-particles';
    mesh;
    material;
    delay;
    maxParticles;
    initialSpeed;
    particleScale;
    size;
    time = 0.0;
    count = 0;
    /**
     * @type {Object3D[]}
     */
    #objects = [];
    /**
    * @type {number[][]}
    */
    #velocities = [];
    #speeds = [];
    #direction = [0, 0, 0];
    start() {
        this.#objects = this.engine.scene.addObjects(this.maxParticles, null, this.maxParticles);
        for (let i = 0; i < this.maxParticles; ++i) {
            this.#velocities.push([Math.random() / 4 - .125, -Math.random() - .2, Math.random() / 4 - .125]);
            let obj = this.#objects[i];
            obj.name = "particle" + this.count.toString();
            let mesh = obj.addComponent(MeshComponent);
            mesh.mesh = this.mesh;
            mesh.material = this.material;
            /* Most efficient way to hide the mesh */
            obj.scaleLocal([0, 0, 0]);
        }
        /* Time to spawn particles */
        for (let i = 0; i < this.maxParticles; ++i) {
            this.spawn();
        }
    }
    update(dt) {
        /* Target for retrieving particles world locations */
        let origin = vec3.fromValues(0, 0, 0);
        let distance = vec3.fromValues(0, 0, 0);
        for (let i = 0; i < Math.min(this.count, this.#objects.length); ++i) {
            /* Get translation first, as object.translate() will mark
             * the object as dirty, which will cause it to recalculate
             * obj.transformWorld on access. We want to avoid this and
             * have it be recalculated in batch at the end of frame
             * instead */
            quat2.getTranslation(origin, this.#objects[i].getTransformWorld());
            /* Apply gravity */
            const vel = this.#velocities[i];
            /* Check if particle would collide */
            if ((origin[0] + vel[0] * dt) > 8)
                origin[0] -= 16;
            else if ((origin[0] + vel[0] * dt) <= -8)
                origin[0] += 16;
            if ((origin[2] + vel[2] * dt) > 8)
                origin[2] -= 16;
            else if ((origin[2] + vel[2] * dt) <= -8)
                origin[2] += 16;
            if ((origin[1] + vel[1] * dt) <= 0) {
                /* Pseudo friction */
                origin[1] = 5;
                this.#objects[i].setPositionWorld(origin);
            }
        }
        for (let i = 0; i < Math.min(this.count, this.#objects.length); ++i) {
            /* Apply velocity */
            vec3.scale(distance, this.#velocities[i], dt);
            this.#objects[i].translateWorld(distance);
        }
    }
    /** Spawn a particle */
    spawn() {
        let index = this.count % this.maxParticles;
        let obj = this.#objects[index];
        obj.resetTransform();
        obj.scaleLocal([this.particleScale, this.particleScale, this.particleScale]);
        /* Activate component, otherwise it will not show up! */
        obj.getComponent(MeshComponent).active = true;
        obj.translateWorld([(Math.random() * this.size) - (this.size / 2), (Math.random() * 5), (Math.random() * this.size) - (this.size / 2)]);
        this.count += 1;
    }
}
__decorate([
    property.mesh()
], SnowParticles.prototype, "mesh", void 0);
__decorate([
    property.material()
], SnowParticles.prototype, "material", void 0);
__decorate([
    property.float(0.1)
], SnowParticles.prototype, "delay", void 0);
__decorate([
    property.int(1500)
], SnowParticles.prototype, "maxParticles", void 0);
__decorate([
    property.float(15)
], SnowParticles.prototype, "initialSpeed", void 0);
__decorate([
    property.float(0.01)
], SnowParticles.prototype, "particleScale", void 0);
__decorate([
    property.int(16)
], SnowParticles.prototype, "size", void 0);
;
