import {Component, Object3D, MeshComponent, Mesh, Material} from '@wonderlandengine/api';
import { property } from "@wonderlandengine/api/decorators.js";

import {quat2, vec3} from 'gl-matrix';

export class SnowParticles extends Component {
    static TypeName = 'snow-particles';

    @property.mesh()
    mesh!: Mesh;

    @property.material()
    material!: Material;

    @property.float(0.1)
    delay!: number;

    @property.int(1500)
    maxParticles!: number;

    @property.float(15)
    initialSpeed!: number;

    @property.float(0.01)
    particleScale!: number;

    @property.int(16)
    size!: number;

    time:number = 0.0;
    count:number = 0;

    /**
     * @type {Object3D[]}
     */
    #objects:Object3D[] = [];
    
    /**
    * @type {number[][]}
    */
    #velocities:vec3[] = [];

    #speeds:number[] = [];

    #direction:number[] = [0, 0, 0];

    start() {
        

        this.#objects = this.engine.scene.addObjects(this.maxParticles, null, this.maxParticles);
   
        for(let i = 0; i < this.maxParticles; ++i) {
            this.#velocities.push([Math.random()/4-.125, -Math.random()-.2, Math.random()/4-.125]);
            let obj = this.#objects[i];
            obj.name = "particle" + this.count.toString();
            let mesh = obj.addComponent(MeshComponent);

            mesh!.mesh = this.mesh;
            mesh!.material = this.material;
            /* Most efficient way to hide the mesh */
            obj.scaleLocal([0, 0, 0]);
        }
        
        /* Time to spawn particles */
        for(let i = 0; i < this.maxParticles; ++i){ 
            this.spawn();
        }
        
    }

    update(dt:number) {
   
        /* Target for retrieving particles world locations */
        let origin = vec3.fromValues(0, 0, 0);
        let distance = vec3.fromValues(0, 0, 0);

        for(let i = 0; i < Math.min(this.count, this.#objects.length); ++i) {
            /* Get translation first, as object.translate() will mark
             * the object as dirty, which will cause it to recalculate
             * obj.transformWorld on access. We want to avoid this and
             * have it be recalculated in batch at the end of frame
             * instead */
            quat2.getTranslation(origin, this.#objects[i].getTransformWorld());

            /* Apply gravity */
            const vel = this.#velocities[i];
            
            /* Check if particle would collide */
            if((origin[0] + vel[0]*dt)>8)origin[0]-=16;
            else if((origin[0] + vel[0]*dt) <= -8)origin[0]+=16;
            
            if((origin[2] + vel[2]*dt)>8)origin[2]-=16;
            else if((origin[2] + vel[2]*dt) <= -8)origin[2]+=16;

            if((origin[1] + vel[1]*dt) <= 0) {
                /* Pseudo friction */
                origin[1] = 5;                
                this.#objects[i].setPositionWorld(origin);
            }
        }

        for(let i = 0; i < Math.min(this.count, this.#objects.length); ++i) {
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
        obj.getComponent(MeshComponent)!.active = true;

        obj.translateWorld([(Math.random()*this.size)-(this.size/2),(Math.random()*5),(Math.random()*this.size)-(this.size/2)]);
   
        this.count += 1;
    }
};
