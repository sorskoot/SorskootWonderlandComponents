import {Material, MaterialConstructor, NumberArray, Texture} from '@wonderlandengine/api';
export interface FlatOpaque extends Material {
    getColor<T extends NumberArray | undefined = undefined>(
        value?: T
    ): T extends undefined ? Float32Array : T;
    setColor(value: NumberArray): void;
}
export interface FlatOpaqueTextured extends Material {
    getColor<T extends NumberArray | undefined = undefined>(
        value?: T
    ): T extends undefined ? Float32Array : T;
    setColor(value: NumberArray): void;
    getTextureOffset<T extends NumberArray | undefined = undefined>(
        value?: T
    ): T extends undefined ? Float32Array : T;
    setTextureOffset(value: NumberArray): void;
    getTextureScale<T extends NumberArray | undefined = undefined>(
        value?: T
    ): T extends undefined ? Float32Array : T;
    setTextureScale(value: NumberArray): void;
    getFlatTexture(): Texture | null;
    setFlatTexture(value: Texture | null | undefined): void;
}
export interface PhongOpaque extends Material {
    getAmbientColor<T extends NumberArray | undefined = undefined>(
        value?: T
    ): T extends undefined ? Float32Array : T;
    setAmbientColor(value: NumberArray): void;
    getDiffuseColor<T extends NumberArray | undefined = undefined>(
        value?: T
    ): T extends undefined ? Float32Array : T;
    setDiffuseColor(value: NumberArray): void;
    getSpecularColor<T extends NumberArray | undefined = undefined>(
        value?: T
    ): T extends undefined ? Float32Array : T;
    setSpecularColor(value: NumberArray): void;
    getFogColor<T extends NumberArray | undefined = undefined>(
        value?: T
    ): T extends undefined ? Float32Array : T;
    setFogColor(value: NumberArray): void;
    getShininess(): number;
    setShininess(value: number): void;
}
export interface PhongOpaqueTextured extends Material {
    getAmbientColor<T extends NumberArray | undefined = undefined>(
        value?: T
    ): T extends undefined ? Float32Array : T;
    setAmbientColor(value: NumberArray): void;
    getDiffuseColor<T extends NumberArray | undefined = undefined>(
        value?: T
    ): T extends undefined ? Float32Array : T;
    setDiffuseColor(value: NumberArray): void;
    getSpecularColor<T extends NumberArray | undefined = undefined>(
        value?: T
    ): T extends undefined ? Float32Array : T;
    setSpecularColor(value: NumberArray): void;
    getEmissiveColor<T extends NumberArray | undefined = undefined>(
        value?: T
    ): T extends undefined ? Float32Array : T;
    setEmissiveColor(value: NumberArray): void;
    getFogColor<T extends NumberArray | undefined = undefined>(
        value?: T
    ): T extends undefined ? Float32Array : T;
    setFogColor(value: NumberArray): void;
    getDiffuseTexture(): Texture | null;
    setDiffuseTexture(value: Texture | null | undefined): void;
    getEmissiveTexture(): Texture | null;
    setEmissiveTexture(value: Texture | null | undefined): void;
    getShininess(): number;
    setShininess(value: number): void;
}

declare module '@wonderlandengine/api' {
    interface MaterialManager {
        getTemplate(pipeline: 'Flat Opaque'): MaterialConstructor<FlatOpaque>;
        getTemplate(
            pipeline: 'Flat Opaque Textured'
        ): MaterialConstructor<FlatOpaqueTextured>;
        getTemplate(pipeline: 'Phong Opaque'): MaterialConstructor<PhongOpaque>;
        getTemplate(
            pipeline: 'Phong Opaque Textured'
        ): MaterialConstructor<PhongOpaqueTextured>;
    }
}
