import { MeshAttribute, MeshIndexType } from '@wonderlandengine/api';
export class MeshUtils {
    // no need to create an instance of this class
    constructor() { }
    static createPlane(meshBuilder, width = 1, height = width) {
        const vertexCount = 4;
        const indexData = new Uint16Array([0, 1, 2, 1, 3, 2]);
        const mesh = meshBuilder.create({
            indexData,
            vertexCount,
            indexType: MeshIndexType.UnsignedInt,
        });
        const positions = mesh.attribute(MeshAttribute.Position); // get the position attribute accessor
        if (positions) {
            positions.set(0, [-0.5 * width, -0.5 * height, 0.0]);
            positions.set(1, [0.5 * width, -0.5 * height, 0.0]);
            positions.set(2, [-0.5 * width, 0.5 * height, 0.0]);
            positions.set(3, [0.5 * width, 0.5 * height, 0.0]);
        }
        const texCoords = mesh.attribute(MeshAttribute.TextureCoordinate);
        if (texCoords) {
            texCoords.set(0, [0.0, 0.0]);
            texCoords.set(1, [1.0, 0.0]);
            texCoords.set(2, [0.0, 1.0]);
            texCoords.set(3, [1.0, 1.0]);
        }
        const normals = mesh.attribute(MeshAttribute.Normal);
        if (normals) {
            normals.set(0, [0.0, 0.0, 1.0]);
            normals.set(1, [0.0, 0.0, 1.0]);
            normals.set(2, [0.0, 0.0, 1.0]);
            normals.set(3, [0.0, 0.0, 1.0]);
        }
        const vcs = mesh.attribute(MeshAttribute.Color);
        if (vcs) {
            vcs.set(0, [1.0, 0.0, 0.0, 1.0]);
            vcs.set(1, [0.0, 1.0, 0.0, 1.0]);
            vcs.set(2, [0.0, 0.0, 1.0, 0.0]);
            vcs.set(3, [1.0, 0.0, 1.0, 0.0]);
        }
        mesh.update();
        return mesh;
    }
    static createBox(meshBuilder, width = 1, height = width, depth = width) {
        const vertexCount = 8;
        // prettier-ignore
        const indexData = new Uint16Array([
            0, 2, 1, //face front
            0, 3, 2,
            2, 3, 4, //face top
            2, 4, 5,
            1, 2, 5, //face right
            1, 5, 6,
            0, 7, 4, //face left
            0, 4, 3,
            5, 4, 7, //face back
            5, 7, 6,
            0, 6, 7, //face bottom 
            0, 1, 6,
        ]);
        const mesh = meshBuilder.create({
            indexData,
            vertexCount,
            indexType: MeshIndexType.UnsignedInt,
        });
        const positions = mesh.attribute(MeshAttribute.Position); // get the position attribute accessor
        if (positions) {
            positions.set(0, [-0.5 * width, -0.5 * height, -0.5 * depth]);
            positions.set(1, [0.5 * width, -0.5 * height, -0.5 * depth]);
            positions.set(2, [0.5 * width, 0.5 * height, -0.5 * depth]);
            positions.set(3, [-0.5 * width, 0.5 * height, -0.5 * depth]);
            positions.set(4, [-0.5 * width, 0.5 * height, 0.5 * depth]);
            positions.set(5, [0.5 * width, 0.5 * height, 0.5 * depth]);
            positions.set(6, [0.5 * width, -0.5 * height, 0.5 * depth]);
            positions.set(7, [-0.5 * width, -0.5 * height, 0.5 * depth]);
        }
        // Add UV
        // Add Normals
        // Add Vertex Colors
        return mesh;
    }
}
