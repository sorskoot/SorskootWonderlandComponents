import {Component} from '@wonderlandengine/api';

class DynamicTextureCache {
    constructor() {
        this.textures = {};
    }
    loadTextures(url, columns, rows) {
        if (!this.textures.hasOwnProperty(url)) {
            this.textures[url] = new Promise((resolve, reject) => { let image = new Image();
                let textures = [];
                image.src = url;
                image.onload = () => {
                    let canvas = document.createElement('canvas');
                    let context = canvas.getContext("2d");
                    canvas.width = image.width;
                    canvas.height = image.height;
                    context.drawImage(image, 0, 0);
                    let spriteWidth = image.width / columns;
                    let spriteHeight = image.height / rows;
                    
                    for (let y = 0; y < rows; y++) {
                        for (let x = 0; x < columns; x++) {
                            let pc = this.copyPartOfCanvas(canvas, x * spriteWidth, y * spriteHeight, spriteWidth, spriteHeight);
                            let texturePc = new WL.Texture(pc);
                            textures.push(texturePc);
                        }
                    };
                    resolve(textures);
                };
            })
        }
        return this.textures[url];
    }

    copyPartOfCanvas(canvas, x, y, width, height) {
        let copy = document.createElement('canvas');
        copy.width = width;
        copy.height = height;
        let ctx2 = copy.getContext("2d");
        ctx2.drawImage(canvas, x, y, width, height, 0, 0, width, height);
        document.body.appendChild(copy)
        return copy;
    }
}
let textureCache = new DynamicTextureCache();

export class Flipbook extends Component {
    static TypeName = 'flipbook';
    static Properties = {
    base: { type: WL.Type.Material },
    url: { type: WL.Type.String, default: '' },
    columns: { type: WL.Type.Int, default: 4 },
    rows: { type: WL.Type.Int, default: 4 },
    duration: { type: WL.Type.Float, default: 2.0 },
    loop: { type: WL.Type.Bool, default: true },
}
    init() {
        this.textures = [];
        /* Keep inactive until texture loaded */
        this.active = false;

        textureCache.loadTextures(this.url, this.columns, this.rows).then((tex) => {
            for (let i = 0; i < tex.length; i++) {
                this.textures.push(this.createMaterial(this.base, tex[i]));
            };

            this.active = true;
            this.index = Math.floor(Math.random() * this.textures.length);
        });
    }

    createMaterial (base, texture, emissiveTexture) {
        let mat = base.clone();
        if (mat.shader == "Flat Opaque Textured"||
        mat.shader == "Flat Opaque Textured Alpha") {
            mat.flatTexture = texture;
        } else if (mat.shader == "Phong Opaque Textured" || mat.shader == "PhongSorskoot Opaque Textured Not Emissive") {
            mat.diffuseTexture = texture;
        } else {
            console.error("Shader", mat.shader, "not supported by flipbook");
        }
        return mat;
    }

    start () {
        this.mesh = this.object.getComponent("mesh");
    }

    onActivate() {
        this.t = 0;
        this.mesh.active = true;
    }

    onDeactivate() {
        if(this.mesh) this.mesh.active = false;
    }

    update(dt) {
        this.t += dt;

        const frame = ~~(this.t*this.textures.length/this.duration);
        if(!this.loop && frame >= this.textures.length) {
            this.active = false;
        }

        this.index = frame % this.textures.length;
        console.log(frame)
        if (this.textures && this.textures.length && this.previousIndex != this.index) {
            this.previousIndex = this.index;
            this.mesh.material = this.textures[this.index];
        }
    }
};
