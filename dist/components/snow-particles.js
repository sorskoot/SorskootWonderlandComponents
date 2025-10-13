var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var _SnowParticles_objects, _SnowParticles_velocities, _SnowParticles_speeds, _SnowParticles_direction;
import { Component, MeshComponent } from '@wonderlandengine/api';
import { property } from "@wonderlandengine/api/decorators.js";
import { quat2, vec3 } from 'gl-matrix';
export class SnowParticles extends Component {
    constructor() {
        super(...arguments);
        this.time = 0.0;
        this.count = 0;
        /**
         * @type {Object3D[]}
         */
        _SnowParticles_objects.set(this, []);
        /**
        * @type {number[][]}
        */
        _SnowParticles_velocities.set(this, []);
        _SnowParticles_speeds.set(this, []);
        _SnowParticles_direction.set(this, [0, 0, 0]);
    }
    start() {
        __classPrivateFieldSet(this, _SnowParticles_objects, this.engine.scene.addObjects(this.maxParticles, null, this.maxParticles), "f");
        for (let i = 0; i < this.maxParticles; ++i) {
            __classPrivateFieldGet(this, _SnowParticles_velocities, "f").push([Math.random() / 4 - .125, -Math.random() - .2, Math.random() / 4 - .125]);
            let obj = __classPrivateFieldGet(this, _SnowParticles_objects, "f")[i];
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
        for (let i = 0; i < Math.min(this.count, __classPrivateFieldGet(this, _SnowParticles_objects, "f").length); ++i) {
            /* Get translation first, as object.translate() will mark
             * the object as dirty, which will cause it to recalculate
             * obj.transformWorld on access. We want to avoid this and
             * have it be recalculated in batch at the end of frame
             * instead */
            quat2.getTranslation(origin, __classPrivateFieldGet(this, _SnowParticles_objects, "f")[i].getTransformWorld());
            /* Apply gravity */
            const vel = __classPrivateFieldGet(this, _SnowParticles_velocities, "f")[i];
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
                __classPrivateFieldGet(this, _SnowParticles_objects, "f")[i].setPositionWorld(origin);
            }
        }
        for (let i = 0; i < Math.min(this.count, __classPrivateFieldGet(this, _SnowParticles_objects, "f").length); ++i) {
            /* Apply velocity */
            vec3.scale(distance, __classPrivateFieldGet(this, _SnowParticles_velocities, "f")[i], dt);
            __classPrivateFieldGet(this, _SnowParticles_objects, "f")[i].translateWorld(distance);
        }
    }
    /** Spawn a particle */
    spawn() {
        let index = this.count % this.maxParticles;
        let obj = __classPrivateFieldGet(this, _SnowParticles_objects, "f")[index];
        obj.resetTransform();
        obj.scaleLocal([this.particleScale, this.particleScale, this.particleScale]);
        /* Activate component, otherwise it will not show up! */
        obj.getComponent(MeshComponent).active = true;
        obj.translateWorld([(Math.random() * this.size) - (this.size / 2), (Math.random() * 5), (Math.random() * this.size) - (this.size / 2)]);
        this.count += 1;
    }
}
_SnowParticles_objects = new WeakMap(), _SnowParticles_velocities = new WeakMap(), _SnowParticles_speeds = new WeakMap(), _SnowParticles_direction = new WeakMap();
SnowParticles.TypeName = 'snow-particles';
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
