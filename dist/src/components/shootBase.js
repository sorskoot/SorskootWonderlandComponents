var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@wonderlandengine/api';
import { property } from '@wonderlandengine/api/decorators.js';
const handedness = ['left', 'right'];
export class ShootBase extends Component {
    static TypeName = 'shoot-base';
    haptics = true;
    handedness = 0;
    initialized = false;
    start() {
        this.initialized = false;
        this.engine.onXRSessionStart.add((session) => {
            if (this.initialized)
                return;
            session.addEventListener('select', (e) => {
                if (!this.active)
                    return;
                if (e.inputSource.handedness === handedness[this.handedness]) {
                    if (this.haptics) {
                        this.pulse(e.inputSource.gamepad);
                    }
                    // todo pass current position and rotation to shoot
                    this.shoot(this.object.getPositionWorld(), this.object.getRotationWorld());
                }
            });
            this.initialized = true;
        });
    }
    pulse(gamepad) {
        var actuator;
        if (!gamepad || !gamepad.hapticActuators) {
            return;
        }
        actuator = gamepad.hapticActuators[0];
        if (!actuator)
            return;
        actuator.pulse(1, 100);
    }
    shoot(transform, rotation) { }
}
__decorate([
    property.bool(true)
], ShootBase.prototype, "haptics", void 0);
__decorate([
    property.enum(['Left', 'Right'])
], ShootBase.prototype, "handedness", void 0);
