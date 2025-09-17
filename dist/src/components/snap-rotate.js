var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, InputComponent } from "@wonderlandengine/api";
import { property } from "@wonderlandengine/api/decorators.js";
import { vec3 } from "gl-matrix";
export class SnapRotate extends Component {
    static TypeName = "snap-rotate";
    player;
    degrees;
    input = null;
    snapped = false;
    start() {
        this.input = this.object.getComponent(InputComponent);
        this.snapped = false;
    }
    update(dt) {
        if (!this.input ||
            !this.input.xrInputSource ||
            !this.input.xrInputSource.gamepad ||
            !this.input.xrInputSource.gamepad.axes) {
            return;
        }
        const currentAxis = this.input.xrInputSource.gamepad.axes[2];
        if (currentAxis > -0.2 && currentAxis < 0.2) {
            this.snapped = false;
            return;
        }
        if (Math.abs(currentAxis) < 0.8) {
            return;
        }
        let lastHeadPos = vec3.fromValues(0, 0, 0);
        this.player.getPositionWorld(lastHeadPos);
        if (currentAxis < -0.8 && !this.snapped) {
            this.player.rotateAxisAngleDegLocal([0, 1, 0], this.degrees);
            this.snapped = true;
        }
        if (currentAxis > 0.8 && !this.snapped) {
            this.player.rotateAxisAngleDegLocal([0, 1, 0], -this.degrees);
            this.snapped = true;
        }
        let currentHeadPos = vec3.fromValues(0, 0, 0);
        this.player.getPositionWorld(currentHeadPos);
        let newPos = vec3.fromValues(0, 0, 0);
        vec3.sub(newPos, lastHeadPos, currentHeadPos);
        this.player.translateLocal(newPos);
    }
}
__decorate([
    property.object()
], SnapRotate.prototype, "player", void 0);
__decorate([
    property.int(30)
], SnapRotate.prototype, "degrees", void 0);
