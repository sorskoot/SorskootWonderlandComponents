var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@wonderlandengine/api';
import { property } from '@wonderlandengine/api/decorators.js';
/**
 * Component that destroys its object after a specified time
 */
export class SelfDestruct extends Component {
    constructor() {
        super(...arguments);
        /**
         * Time in seconds after which the object will be destroyed
         */
        this.lifeTime = 1.0;
        /** Tracks elapsed time since component activation */
        this._time = 0;
    }
    /**
     * Validates component properties on start
     */
    start() {
        if (this.lifeTime <= 0) {
            throw new Error('self-destruct: lifeTime must be greater than 0');
        }
    }
    /**
     * Updates elapsed time and destroys object when lifetime is reached
     * @param dt Delta time in seconds
     */
    update(dt) {
        this._time += dt;
        if (!this.object.isDestroyed && this._time > this.lifeTime) {
            this.object.destroy();
        }
    }
}
SelfDestruct.TypeName = 'self-destruct';
__decorate([
    property.float(1.0)
], SelfDestruct.prototype, "lifeTime", void 0);
