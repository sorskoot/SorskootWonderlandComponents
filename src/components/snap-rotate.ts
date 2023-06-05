import { Component,Object3D, InputComponent } from "@wonderlandengine/api";
import { property } from "@wonderlandengine/api/decorators.js";
import { vec3 } from "gl-matrix";

export class SnapRotate extends Component {
  static TypeName = "snap-rotate";

  @property.object()
  player!: Object3D;

  @property.int(30)
  degrees!: number;

  input:InputComponent|null = null;
  snapped:boolean = false;

  start() {
    this.input = this.object.getComponent(InputComponent);
    this.snapped = false;
  }

  update(dt:number) {
    if (!this.input || !this.input.xrInputSource) {
      return;
    }

    const currentAxis = this.input.xrInputSource.gamepad!.axes[2];

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
