var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, MeshComponent, } from '@wonderlandengine/api';
import { property } from '@wonderlandengine/api/decorators.js';
class DynamicTextureCache {
    _textures;
    _engine;
    constructor(engine) {
        this._textures = {};
        this._engine = engine;
    }
    loadTextures(url, columns, rows) {
        if (!this._textures.hasOwnProperty(url)) {
            this._textures[url] = new Promise((resolve, reject) => {
                const image = new Image();
                const textures = [];
                image.src = url;
                image.onload = () => {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    if (context == null) {
                        reject('Could not get 2D context');
                        return;
                    }
                    canvas.width = image.width;
                    canvas.height = image.height;
                    context.drawImage(image, 0, 0);
                    const spriteWidth = image.width / columns;
                    const spriteHeight = image.height / rows;
                    for (let y = 0; y < rows; y++) {
                        for (let x = 0; x < columns; x++) {
                            const pc = this._copyPartOfCanvas(canvas, x * spriteWidth, y * spriteHeight, spriteWidth, spriteHeight);
                            const texturePc = this._engine.textures.create(pc);
                            textures.push(texturePc);
                        }
                    }
                    resolve(textures);
                };
                image.onerror = () => {
                    reject(`Failed to load image from URL: ${url}`);
                };
            });
        }
        return this._textures[url];
    }
    _copyPartOfCanvas(canvas, x, y, width, height) {
        const copy = document.createElement('canvas');
        copy.width = width;
        copy.height = height;
        const ctx2 = copy.getContext('2d');
        if (ctx2) {
            ctx2.drawImage(canvas, x, y, width, height, 0, 0, width, height);
        }
        return copy;
    }
}
let textureCache;
export class Flipbook extends Component {
    static TypeName = 'flipbook';
    /**
     * Base material to clone for each frame
     */
    base;
    /**
     * URL to the sprite sheet texture
     */
    url = '';
    /**
     * URL to the emissive sprite sheet texture (optional)
     */
    urlEmissive = '';
    /**
     * Number of columns in the sprite sheet
     */
    columns = 4;
    /**
     * Number of rows in the sprite sheet
     */
    rows = 4;
    /**
     * Animation speed in frames per second
     */
    speed = 8.0;
    _textures = [];
    _loaded = false;
    _index = 0;
    _previousIndex = -1;
    _meshComponent = null;
    _time = 0;
    init() {
        if (!textureCache) {
            textureCache = new DynamicTextureCache(this.engine);
        }
        const texturesPromises = [];
        texturesPromises.push(textureCache.loadTextures(this.url, this.columns, this.rows));
        if (this.urlEmissive) {
            texturesPromises.push(textureCache.loadTextures(this.urlEmissive, this.columns, this.rows));
        }
        Promise.all(texturesPromises)
            .then((tex) => {
            this._textures = [];
            if (this.urlEmissive) {
                for (let i = 0; i < tex[0].length; i++) {
                    this._textures.push(this._createMaterial(this.base, tex[0][i], tex[1][i]));
                }
            }
            else {
                for (let i = 0; i < tex[0].length; i++) {
                    this._textures.push(this._createMaterial(this.base, tex[0][i]));
                }
            }
            this._loaded = true;
            this._index = Math.floor(Math.random() * this._textures.length);
        })
            .catch((error) => {
            console.error('Flipbook: Failed to load textures', error);
        });
    }
    _createMaterial(base, texture, emissiveTexture = null) {
        const mat = base.clone();
        if (!mat) {
            throw new Error('Flipbook: Could not clone material');
        }
        if (mat.pipeline == 'Flat Opaque Textured' ||
            mat.pipeline.startsWith('FlatSorskoot')) {
            const flatMat = mat;
            flatMat.flatTexture = texture;
            if (mat.pipeline == 'FlatSorskoot Emissive') {
                if (emissiveTexture) {
                    flatMat.emissiveTexture = emissiveTexture;
                }
            }
        }
        else {
            console.error(`Flipbook: Pipeline ${mat.pipeline} not supported by flipbook`);
        }
        return mat;
    }
    start() {
        if (!this.url) {
            throw new Error('Flipbook: URL property is required for the sprite sheet');
        }
        if (!this.base) {
            throw new Error('Flipbook: Base material is required');
        }
        this._meshComponent = this.object.getComponent(MeshComponent);
        if (!this._meshComponent) {
            throw new Error('Flipbook: MeshComponent is required on the same object');
        }
        this._time = Math.random() * this.speed;
    }
    update(dt) {
        if (!this._loaded) {
            return;
        }
        this._time += dt * this.speed;
        this._index = Math.floor(this._time) % this._textures.length;
        if (this._textures.length > 0 &&
            this._previousIndex != this._index &&
            this._meshComponent) {
            this._previousIndex = this._index;
            this._meshComponent.material = this._textures[this._index];
        }
    }
}
__decorate([
    property.material({ required: true })
], Flipbook.prototype, "base", void 0);
__decorate([
    property.string('')
], Flipbook.prototype, "url", void 0);
__decorate([
    property.string('')
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
