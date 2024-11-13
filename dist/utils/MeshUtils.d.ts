import { Mesh, MeshManager } from '@wonderlandengine/api';
export declare class MeshUtils {
    private constructor();
    static createPlane(meshBuilder: MeshManager, width?: number, height?: number): Mesh;
    static createBox(meshBuilder: MeshManager, width?: number, height?: number, depth?: number): Mesh;
}
