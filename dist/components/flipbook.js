var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Texture, MeshComponent } from "@wonderlandengine/api";
import { property } from "@wonderlandengine/api/decorators.js";
class DynamicTextureCache {
    textures;
    engine;
    constructor(engine) {
        this.textures = {};
        this.engine = engine;
    }
    loadTextures(url, columns, rows) {
        if (!this.textures.hasOwnProperty(url)) {
            this.textures[url] = new Promise((resolve, reject) => {
                let image = new Image();
                let textures = [];
                image.src = url;
                image.onload = () => {
                    let canvas = document.createElement("canvas");
                    let context = canvas.getContext("2d");
                    if (context == null)
                        reject("Could not get context");
                    canvas.width = image.width;
                    canvas.height = image.height;
                    context.drawImage(image, 0, 0);
                    let spriteWidth = image.width / columns;
                    let spriteHeight = image.height / rows;
                    for (let y = 0; y < rows; y++) {
                        for (let x = 0; x < columns; x++) {
                            let pc = this.copyPartOfCanvas(canvas, x * spriteWidth, y * spriteHeight, spriteWidth, spriteHeight);
                            let texturePc = new Texture(this.engine, pc);
                            textures.push(texturePc);
                        }
                    }
                    resolve(textures);
                };
            });
        }
        return this.textures[url];
    }
    copyPartOfCanvas(canvas, x, y, width, height) {
        let copy = document.createElement("canvas");
        copy.width = width;
        copy.height = height;
        let ctx2 = copy.getContext("2d");
        ctx2.drawImage(canvas, x, y, width, height, 0, 0, width, height);
        return copy;
    }
}
let textureCache;
export class Flipbook extends Component {
    static TypeName = "flipbook";
    base;
    url = "";
    urlEmissive = "";
    columns = 4;
    rows = 4;
    speed = 8.0;
    textures = [];
    loaded = false;
    index = 0;
    init() {
        if (!textureCache) {
            textureCache = new DynamicTextureCache(this.engine);
        }
        let texturesPromises = [];
        texturesPromises.push(textureCache.loadTextures(this.url, this.columns, this.rows));
        if (this.urlEmissive) {
            texturesPromises.push(textureCache.loadTextures(this.urlEmissive, this.columns, this.rows));
        }
        Promise.all(texturesPromises).then((tex) => {
            this.textures = [];
            if (this.urlEmissive) {
                for (let i = 0; i < tex[0].length; i++) {
                    this.textures.push(this.createMaterial(this.base, tex[0][i], tex[1][i]));
                }
            }
            else {
                for (let i = 0; i < tex[0].length; i++) {
                    this.textures.push(this.createMaterial(this.base, tex[0][i]));
                }
            }
            this.loaded = true;
            this.index = Math.floor(Math.random() * this.textures.length);
        });
    }
    createMaterial(base, texture, emissiveTexture = null) {
        const mat = base.clone();
        if (!mat)
            throw new Error("Could not clone material");
        if (mat.pipeline == "Flat Opaque Textured"
            || mat.pipeline.startsWith("FlatSorskoot")) {
            const flatMat = mat;
            flatMat.flatTexture = texture;
            if (mat.pipeline == "FlatSorskoot Emissive") {
                flatMat.flatTexture = texture;
                if (emissiveTexture) {
                    flatMat.emissiveTexture = emissiveTexture;
                }
            }
        }
        else {
            console.error(`Pipeline ${mat.pipeline} not supported by flipbook`);
        }
        return mat;
    }
    mat = null;
    t = 0;
    start() {
        this.mat = this.object.getComponent(MeshComponent);
        this.t = Math.random() * this.speed;
    }
    previousIndex = -1;
    update(dt) {
        if (!this.loaded)
            return;
        this.t += dt * this.speed;
        this.index = ~~this.t % this.textures.length;
        if (this.textures &&
            this.textures.length &&
            this.previousIndex != this.index &&
            this.mat) {
            this.previousIndex = this.index;
            this.mat.material = this.textures[this.index];
        }
    }
}
__decorate([
    property.material()
], Flipbook.prototype, "base", void 0);
__decorate([
    property.string("")
], Flipbook.prototype, "url", void 0);
__decorate([
    property.string("")
], Flipbook.prototype, "urlEmissive", void 0);
__decorate([
    property.int(4)
], Flipbook.prototype, "columns", void 0);
__decorate([
    property.int(4)
], Flipbook.prototype, "rows", void 0);
__decorate([
    property.float(8.0)
], Flipbook.prototype, "speed", void 0);
