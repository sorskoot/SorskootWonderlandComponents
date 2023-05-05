import {Component} from '@wonderlandengine/api';
import {quat2, vec3} from 'gl-matrix';

export class SnowParticles extends Component {
    static TypeName = 'snow-particles';
    static Properties = {
    /* Mesh for spawned particles */
    mesh: {type: WL.Type.Mesh, default: null},
    /* Material for spawned particles */
    material: {type: WL.Type.Material, default: null},
    /* Delay between particle spawns. If below time of a frame, will spawn multiple particles in update. */
    delay: {type: WL.Type.Float, default: 0.1},
    /* Maximum number of particles, once limit is reached, particles are recycled first-in-first-out. */
    maxParticles: {type: WL.Type.Int, default: 1500},
    /* Initial speed of emitted particles. */
    initialSpeed: {type: WL.Type.Float, default: 15},
    /* Size of a particle */
    particleScale: {type: WL.Type.Float, default: 0.01},
    /* Size of the area to spawn in meters */
    size: {type: WL.Type.Int, default: 16}
    }

    init() {
        this.time = 0.0;
        this.count = 0;
    }

    start() {
        this.objects = [];
        this.velocities = [];

        this.objects = WL.scene.addObjects(this.maxParticles, null, this.maxParticles);
        this.speeds = []
        this.direction = []
        for(let i = 0; i < this.maxParticles; ++i) {
            this.velocities.push([Math.random()/4-.125, -Math.random()-.2, Math.random()/4-.125]);
            let obj = this.objects[i];
            obj.name = "particle" + this.count.toString();
            let mesh = obj.addComponent('mesh');

            mesh.mesh = this.mesh;
            mesh.material = this.material;
            /* Most efficient way to hide the mesh */
            obj.scale([0, 0, 0]);
        }
        
        /* Time to spawn particles */
        for(let i = 0; i < this.maxParticles; ++i){ 
            this.spawn();
        }
        
    }

    update(dt) {
   
        /* Target for retrieving particles world locations */
        let origin = [0, 0, 0];
        let distance = [0, 0, 0];

        for(let i = 0; i < Math.min(this.count, this.objects.length); ++i) {
            /* Get translation first, as object.translate() will mark
             * the object as dirty, which will cause it to recalculate
             * obj.transformWorld on access. We want to avoid this and
             * have it be recalculated in batch at the end of frame
             * instead */
            quat2.getTranslation(origin, this.objects[i].transformWorld);

            /* Apply gravity */
            const vel = this.velocities[i];
            
            /* Check if particle would collide */
            if((origin[0] + vel[0]*dt)>8)origin[0]-=16;
            else if((origin[0] + vel[0]*dt) <= -8)origin[0]+=16;
            
            if((origin[2] + vel[2]*dt)>8)origin[2]-=16;
            else if((origin[2] + vel[2]*dt) <= -8)origin[2]+=16;

            if((origin[1] + vel[1]*dt) <= 0) {
                /* Pseudo friction */
                origin[1] = 5;                
                this.objects[i].setTranslationWorld(origin);
            }
        }

        for(let i = 0; i < Math.min(this.count, this.objects.length); ++i) {
            /* Apply velocity */
            vec3.scale(distance, this.velocities[i], dt);
            this.objects[i].translate(distance);
        }
     
    }

    /** Spawn a particle */
    spawn() {
        let index = this.count % this.maxParticles;

        let obj = this.objects[index];
        obj.resetTransform();
        obj.scale([this.particleScale, this.particleScale, this.particleScale]);

        /* Activate component, otherwise it will not show up! */
        obj.getComponent('mesh').active = true;

        obj.translate([(Math.random()*this.size)-(this.size/2),(Math.random()*5),(Math.random()*this.size)-(this.size/2)]);
   
        this.count += 1;
    }
};
