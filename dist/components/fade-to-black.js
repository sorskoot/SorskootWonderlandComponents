var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, MeshComponent } from '@wonderlandengine/api';
import { property } from '@wonderlandengine/api/decorators.js';
import { wlUtils } from '../utils/wlUtils.js';
var TransitionType;
(function (TransitionType) {
    TransitionType[TransitionType["FadeToBlack"] = 0] = "FadeToBlack";
    TransitionType[TransitionType["FadeFromBlack"] = 1] = "FadeFromBlack";
    TransitionType[TransitionType["None"] = 2] = "None";
})(TransitionType || (TransitionType = {}));
/**
 * FadeToBlack component
 *
 * This component fades the screen to black or from black.
 * It needs some setup to make sure the entire screen fades to black.
 *
 * I usually use a manager to control the flow of the game.
 *
 * Here a few snippets that might help :P
 ```ts
    
// get Component
this._fadeToBlackComponent =
    this.transitionObject.getComponent(FadeToBlack);
this.transitionObject.parent = this.camera;

private async transition(
    ) {
        // maybe we need to stop something in the update
        this._fadeInProgress = true;
        await this._transitionController.fadeToBlack();

        // do something while the screen is black

        await this._transitionController.fadeFromBlack();
        this._fadeInProgress = false;
    }
```
 */
export class FadeToBlack extends Component {
    static TypeName = 'fade-to-black';
    fadeObject;
    fadeTransitionTime = 0.5;
    fadeColor = [0.0, 0.0, 0.0, 1.0];
    _transitionInProgress = TransitionType.None;
    _fadeMaterial;
    _alphaValue = 1.0;
    init() {
        // Disable the object on init
        wlUtils.setActive(this.object, false);
        this.object.resetPosition();
    }
    start() {
        const meshComponent = this.fadeObject.getComponent(MeshComponent);
        if (!meshComponent) {
            console.error('FadeToBlack component requires a mesh component on the fadeObject');
            return;
        }
        this._fadeMaterial = meshComponent.material;
        if (!this._fadeMaterial) {
            console.error('FadeToBlack component requires a FlatOpaque material on the fadeObject');
            return;
        }
    }
    _resolve = () => { };
    fadeToBlack() {
        this._transitionInProgress = TransitionType.FadeToBlack;
        this._setObjectsActive();
        this._alphaValue = 0;
        this._fadeMaterial.setColor(this.fadeColor);
        const completionPromise = new Promise((r) => (this._resolve = r));
        return completionPromise;
    }
    fadeFromBlack() {
        this._transitionInProgress = TransitionType.FadeFromBlack;
        this._setObjectsActive();
        this._alphaValue = 1;
        this._fadeMaterial.setColor(this.fadeColor);
        const completionPromise = new Promise((r) => (this._resolve = r));
        return completionPromise;
    }
    _setObjectsActive() {
        wlUtils.setActive(this.object, true);
        if (this._transitionInProgress === TransitionType.FadeToBlack ||
            this._transitionInProgress === TransitionType.FadeFromBlack) {
            wlUtils.setActive(this.fadeObject, true);
        }
    }
    update(dt) {
        if (this._transitionInProgress === TransitionType.None) {
            return;
        }
        if (this._transitionInProgress === TransitionType.FadeToBlack) {
            this._alphaValue += dt / this.fadeTransitionTime;
            if (this._alphaValue >= 1) {
                this._alphaValue = 1;
                this._transitionInProgress = TransitionType.None;
                this._resolve();
            }
        }
        else if (this._transitionInProgress === TransitionType.FadeFromBlack) {
            this._alphaValue -= dt / this.fadeTransitionTime;
            if (this._alphaValue <= 0) {
                this._alphaValue = 0;
                wlUtils.setActive(this.object, false);
                this._transitionInProgress = TransitionType.None;
                this._resolve();
            }
        }
        if (this._transitionInProgress === TransitionType.FadeFromBlack ||
            this._transitionInProgress === TransitionType.FadeToBlack) {
            this._fadeMaterial.setColor([
                this.fadeColor[0],
                this.fadeColor[1],
                this.fadeColor[2],
                this._alphaValue,
            ]);
        }
    }
}
__decorate([
    property.object({ required: true })
], FadeToBlack.prototype, "fadeObject", void 0);
__decorate([
    property.float(0.5)
], FadeToBlack.prototype, "fadeTransitionTime", void 0);
__decorate([
    property.color(0.0, 0.0, 0.0, 1.0)
], FadeToBlack.prototype, "fadeColor", void 0);
