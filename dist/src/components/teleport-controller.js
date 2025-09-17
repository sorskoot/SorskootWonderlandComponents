var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@wonderlandengine/api';
import { vec3 } from 'gl-matrix';
import { property } from '@wonderlandengine/api/decorators.js';
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
    static _instance;
    static get instance() {
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
    eyeLeft;
    /**
     * Right eye for use in VR
     */
    eyeRight;
    /**
     * Non-vr camera for use outside of VR
     */
    nonVrCamera;
    /**
     * Root of the player, the object that will be positioned on teleportation.
     * In a default project setup this is 'Player'.
     */
    playerRoot;
    _tempVec = new Float32Array(3);
    _tempVec0 = new Float32Array(3);
    start() {
        if (!this.eyeLeft || !this.eyeRight || !this.nonVrCamera || !this.playerRoot) {
            throw new Error('teleport-controller: All properties must be properly assigned before using the component.');
        }
    }
    /**
     * Moves the player to a new position.
     * @param newPosition - The new position to teleport the player to.
     */
    moveToPosition(newPosition) {
        this._teleportPlayer(newPosition);
    }
    _teleportPlayer(newPosition) {
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
    _rotatePlayer(rotationToAdd) {
        this.playerRoot.resetRotation();
        this.playerRoot.rotateAxisAngleDegObject([0, 1, 0], rotationToAdd);
    }
}
__decorate([
    property.object()
], TeleportController.prototype, "eyeLeft", void 0);
__decorate([
    property.object()
], TeleportController.prototype, "eyeRight", void 0);
__decorate([
    property.object()
], TeleportController.prototype, "nonVrCamera", void 0);
__decorate([
    property.object()
], TeleportController.prototype, "playerRoot", void 0);
