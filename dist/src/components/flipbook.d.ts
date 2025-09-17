import { Component, Material } from '@wonderlandengine/api';
export declare class Flipbook extends Component {
    static TypeName: string;
    /**
     * Base material to clone for each frame
     */
    base: Material;
    /**
     * URL to the sprite sheet texture
     */
    url: string;
    /**
     * URL to the emissive sprite sheet texture (optional)
     */
    urlEmissive: string;
    /**
     * Number of columns in the sprite sheet
     */
    columns: number;
    /**
     * Number of rows in the sprite sheet
     */
    rows: number;
    /**
     * Animation speed in frames per second
     */
    speed: number;
    private _textures;
    private _loaded;
    private _index;
    private _previousIndex;
    private _meshComponent;
    private _time;
    init(): void;
    private _createMaterial;
    start(): void;
    update(dt: number): void;
}
