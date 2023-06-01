import { Component, Property } from "@wonderlandengine/api";
import { vec3 } from "gl-matrix";

export class SnapRotate extends Component {
  static TypeName = "snap-rotate";
  static Properties = {
    player: Property.object(),
    degrees: Property.int(30),
  };

  start() {
    this.input = this.object.getComponent("input");
    this.snapped = false;
  }

  update(dt) {
    if (!this.input.xrInputSource) {
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
    let lastHeadPos = [0, 0, 0];
    this.player.getTranslationWorld(lastHeadPos);

    if (currentAxis < -0.8 && !this.snapped) {
      this.player.rotateAxisAngleDeg([0, 1, 0], this.degrees);
      this.snapped = true;
    }

    if (currentAxis > 0.8 && !this.snapped) {
      this.player.rotateAxisAngleDeg([0, 1, 0], -this.degrees);
      this.snapped = true;
    }

    let currentHeadPos = [0, 0, 0];
    this.player.getTranslationWorld(currentHeadPos);
    let newPos = [0, 0, 0];
    vec3.sub(newPos, lastHeadPos, currentHeadPos);
    this.player.translate(newPos);
  }
}
