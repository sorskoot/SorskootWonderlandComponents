import {Component, Object3D} from '@wonderlandengine/api';
import {vec3} from 'gl-matrix';
import {property} from '@wonderlandengine/api/decorators.js';
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
export class TeleportController extends Component {
    static TypeName = 'teleport-controller';

    private static _instance: TeleportController;

    static get instance(): TeleportController {
        return TeleportController._instance;
    }

    init() {
        if (TeleportController._instance) {
            console.error('There can only be one instance of Teleport Component');
        }
        TeleportController._instance = this;
    }

    /**
     * Left eye for use in VR
     */
    @property.object()
    eyeLeft!: Object3D;

    /**
     * Right eye for use in VR
     */
    @property.object()
    eyeRight!: Object3D;

    /**
     * Non-vr camera for use outside of VR
     */
    @property.object()
    nonVrCamera!: Object3D;

    /**
     * Root of the player, the object that will be positioned on teleportation.
     * In a default project setup this is 'Player'.
     */
    @property.object()
    playerRoot!: Object3D;

    private _tempVec: Float32Array = new Float32Array(3);
    private _tempVec0: Float32Array = new Float32Array(3);

    start() {
        if (!this.eyeLeft || !this.eyeRight || !this.nonVrCamera || !this.playerRoot) {
            throw new Error(
                'teleport-controller: All properties must be properly assigned before using the component.'
            );
        }
    }

    /**
     * Moves the player to a new position.
     * @param newPosition - The new position to teleport the player to.
     */
    moveToPosition(newPosition: number[]) {
        this._teleportPlayer(newPosition);
    }

    private _teleportPlayer(newPosition: number[]) {
        // TK: Maybe we need to fade to black before moving the player?
        // Or at least implement the option.

        const p = this._tempVec;
        const p1 = this._tempVec0;

        // if (this.gameState.isInVR) {
        this.eyeLeft.getPositionWorld(p);
        this.eyeRight.getPositionWorld(p1);

        vec3.add(p, p, p1);
        vec3.scale(p, p, 0.5);
        // } else {
        // this.cam.getPositionWorld(p);
        // }

        this.playerRoot.getPositionWorld(p1);
        vec3.sub(p, p1, p);
        p[0] += newPosition[0];
        p[1] = newPosition[1];
        p[2] += newPosition[2];
        this.playerRoot.setPositionWorld(p);
    }

    private _rotatePlayer(rotationToAdd: number) {
        this.playerRoot.resetRotation();
        this.playerRoot.rotateAxisAngleDegObject([0, 1, 0], rotationToAdd);
    }
}
