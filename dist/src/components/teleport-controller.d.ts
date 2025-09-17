import { Component, Object3D } from '@wonderlandengine/api';
/**
 * @class TeleportController
 * @extends {Component}
 *
 * The `TeleportController` component allows for teleportation of a player within a VR environment.
 * It handles both VR and non-VR scenarios by managing the positions of the player's eyes and camera.
 *
 * @property {Object3D} eyeLeft - Left eye for use in VR.
 * @property {Object3D} eyeRight - Right eye for use in VR.
 * @property {Object3D} nonVrCamera - Non-vr camera for use outside of VR.
 * @property {Object3D} playerRoot - Root of the player, the object that will be positioned on teleportation. In a default project setup this is 'Player'.
 *
 * @example
 * // Add the component to an object
 * const teleportController = object.addComponent('teleport-controller');
 *
 * // Set the required properties
 * teleportController.eyeLeft = leftEyeObject;
 * teleportController.eyeRight = rightEyeObject;
 * teleportController.nonVrCamera = cameraObject;
 * teleportController.playerRoot = playerObject;
 *
 * // Teleport the player to a new position
 * teleportController.moveToPosition([1.0, 0.0, -5.0]);
 */
export declare class TeleportController extends Component {
    static TypeName: string;
    private static _instance;
    static get instance(): TeleportController;
    init(): void;
    /**
     * Left eye for use in VR
     */
    eyeLeft: Object3D;
    /**
     * Right eye for use in VR
     */
    eyeRight: Object3D;
    /**
     * Non-vr camera for use outside of VR
     */
    nonVrCamera: Object3D;
    /**
     * Root of the player, the object that will be positioned on teleportation.
     * In a default project setup this is 'Player'.
     */
    playerRoot: Object3D;
    private _tempVec;
    private _tempVec0;
    start(): void;
    /**
     * Moves the player to a new position.
     * @param newPosition - The new position to teleport the player to.
     */
    moveToPosition(newPosition: number[]): void;
    private _teleportPlayer;
    private _rotatePlayer;
}
