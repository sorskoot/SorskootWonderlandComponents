import { Component, Texture, Material, MeshComponent } from "@wonderlandengine/api";
export declare class Flipbook extends Component {
    static TypeName: string;
    base: Material;
    url: string;
    urlEmissive: string;
    columns: number;
    rows: number;
    speed: number;
    textures: Material[];
    loaded: boolean;
    index: number;
    init(): void;
    createMaterial(base: Material, texture: Texture, emissiveTexture?: Texture | null): Material;
    mat: MeshComponent | null;
    t: number;
    start(): void;
    previousIndex: number;
    update(dt: number): void;
}
