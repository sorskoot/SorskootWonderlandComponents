var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@wonderlandengine/api';
import { property } from '@wonderlandengine/api/decorators.js';
export class SelfDestruct extends Component {
    static TypeName = 'self-destruct';
    lifeTime = 1.0;
    _time = 0;
    start() { }
    update(dt) {
        this._time += dt;
        if (!this.object.isDestroyed && this._time > this.lifeTime) {
            this.object.destroy();
        }
    }
}
__decorate([
    property.float(1.0)
], SelfDestruct.prototype, "lifeTime", void 0);
