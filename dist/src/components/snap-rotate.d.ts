import { Component, Object3D, InputComponent } from "@wonderlandengine/api";
export declare class SnapRotate extends Component {
    static TypeName: string;
    player: Object3D;
    degrees: number;
    input: InputComponent | null;
    snapped: boolean;
    start(): void;
    update(dt: number): void;
}
