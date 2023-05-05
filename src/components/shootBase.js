import { Component } from '@wonderlandengine/api';

const handedness = ['left', 'right']

export class ShootBase extends Component {
    static TypeName = 'shoot-base';
    static Properties = {
        haptics: { type: WL.Type.Bool, default: true },
        handedness: { type: WL.Type.Enum, values: ['Left', 'Right'], default: 'Left' }
    }

    start() {
        this.initialized = false;
        WL.onXRSessionStart.push((session) => {
            if (this.initialized) return;
            session.addEventListener('select', (e) => {
                if (!this.active) return;
                if (e.inputSource.handedness === handedness[this.handedness]) {
                    if (this.haptics) {
                        this.pulse(e.inputSource.gamepad);
                    }
                    // todo pass current position and rotation to shoot
                    this.shoot(this.object.transformWorld, this.object.rotationWorld);
                }
            });
            this.initialized = true;
        })
    }

    pulse(gamepad) {
        var actuator;
        if (!gamepad || !gamepad.hapticActuators) { return; }
        actuator = gamepad.hapticActuators[0];
        if (!actuator) return;
        actuator.pulse(1, 100);
    }

    shoot(transform, rotation) { }
};