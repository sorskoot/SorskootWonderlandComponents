import {
    WonderlandEngine,
    Component,
    Texture,
    Material,
    MeshComponent,
} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';

interface TexturePromiseCache {
    [url: string]: Promise<Texture[]>;
}

class DynamicTextureCache {
    private _textures: TexturePromiseCache;
    private _engine: WonderlandEngine;

    constructor(engine: WonderlandEngine) {
        this._textures = {};
        this._engine = engine;
    }

    loadTextures(url: string, columns: number, rows: number): Promise<Texture[]> {
        if (!this._textures.hasOwnProperty(url)) {
            this._textures[url] = new Promise((resolve, reject) => {
                const image = new Image();
                const textures: Texture[] = [];
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
                            const pc = this._copyPartOfCanvas(
                                canvas,
                                x * spriteWidth,
                                y * spriteHeight,
                                spriteWidth,
                                spriteHeight
                            );
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

    private _copyPartOfCanvas(
        canvas: CanvasImageSource,
        x: number,
        y: number,
        width: number,
        height: number
    ): HTMLCanvasElement {
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

let textureCache: DynamicTextureCache;

interface FlatMaterial extends Material {
    flatTexture: Texture;
    emissiveTexture: Texture;
}

export class Flipbook extends Component {
    static TypeName = 'flipbook';

    /**
     * Base material to clone for each frame
     */
    @property.material({required: true})
    base!: Material;

    /**
     * URL to the sprite sheet texture
     */
    @property.string('')
    url: string = '';

    /**
     * URL to the emissive sprite sheet texture (optional)
     */
    @property.string('')
    urlEmissive: string = '';

    /**
     * Number of columns in the sprite sheet
     */
    @property.int(4)
    columns: number = 4;

    /**
     * Number of rows in the sprite sheet
     */
    @property.int(4)
    rows: number = 4;

    /**
     * Animation speed in frames per second
     */
    @property.float(8.0)
    speed: number = 8.0;

    private _textures: Material[] = [];
    private _loaded: boolean = false;
    private _index: number = 0;
    private _previousIndex: number = -1;
    private _meshComponent: MeshComponent | null = null;
    private _time: number = 0;

    init() {
        if (!textureCache) {
            textureCache = new DynamicTextureCache(this.engine);
        }
        const texturesPromises = [];

        texturesPromises.push(textureCache.loadTextures(this.url, this.columns, this.rows));
        if (this.urlEmissive) {
            texturesPromises.push(
                textureCache.loadTextures(this.urlEmissive, this.columns, this.rows)
            );
        }

        Promise.all(texturesPromises)
            .then((tex) => {
                this._textures = [];

                if (this.urlEmissive) {
                    for (let i = 0; i < tex[0].length; i++) {
                        this._textures.push(
                            this._createMaterial(this.base, tex[0][i], tex[1][i])
                        );
                    }
                } else {
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

    private _createMaterial(
        base: Material,
        texture: Texture,
        emissiveTexture: Texture | null = null
    ): Material {
        const mat = base.clone();
        if (!mat) {
            throw new Error('Flipbook: Could not clone material');
        }

        if (
            mat.pipeline == 'Flat Opaque Textured' ||
            mat.pipeline.startsWith('FlatSorskoot')
        ) {
            const flatMat = mat as FlatMaterial;
            flatMat.flatTexture = texture;
            if (mat.pipeline == 'FlatSorskoot Emissive') {
                if (emissiveTexture) {
                    flatMat.emissiveTexture = emissiveTexture;
                }
            }
        } else {
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

    update(dt: number) {
        if (!this._loaded) {
            return;
        }

        this._time += dt * this.speed;
        this._index = Math.floor(this._time) % this._textures.length;

        if (
            this._textures.length > 0 &&
            this._previousIndex != this._index &&
            this._meshComponent
        ) {
            this._previousIndex = this._index;
            this._meshComponent.material = this._textures[this._index];
        }
    }
}
