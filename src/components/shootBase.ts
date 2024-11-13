import {Component} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';

const handedness = ['left', 'right'];

export class ShootBase extends Component {
    static TypeName = 'shoot-base';

    @property.bool(true)
    haptics: boolean = true;

    @property.enum(['Left', 'Right'])
    handedness: number = 0;

    initialized: boolean = false;

    start() {
        this.initialized = false;
        this.engine.onXRSessionStart.add((session) => {
            if (this.initialized) return;
            session.addEventListener('select', (e) => {
                if (!this.active) return;
                if (e.inputSource.handedness === handedness[this.handedness]) {
                    if (this.haptics) {
                        this.pulse(e.inputSource.gamepad);
                    }
                    // todo pass current position and rotation to shoot
                    this.shoot(
                        this.object.getPositionWorld(),
                        this.object.getRotationWorld()
                    );
                }
            });
            this.initialized = true;
        });
    }

    pulse(gamepad: Gamepad | undefined) {
        var actuator;
        if (!gamepad || !gamepad.hapticActuators) {
            return;
        }
        actuator = gamepad.hapticActuators[0];
        if (!actuator) return;
        actuator.pulse(1, 100);
    }

    shoot(transform: Float32Array | number[], rotation: Float32Array | number[]) {}
}
