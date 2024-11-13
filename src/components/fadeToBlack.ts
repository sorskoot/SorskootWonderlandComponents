import {Component, Emitter, Material, MeshComponent, Object3D} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';
import {FlatOpaque} from '../types/materials.js';
import {wlUtils} from '../utils/wlUtils.js';

enum TransitionType {
    FadeToBlack,
    FadeFromBlack,
    None,
}
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

    @property.object({required: true})
    fadeObject!: Object3D;

    @property.float(0.5)
    fadeTransitionTime = 0.5;

    @property.color(0.0, 0.0, 0.0, 1.0)
    fadeColor = [0.0, 0.0, 0.0, 1.0];

    private _transitionInProgress = TransitionType.None;
    private _fadeMaterial!: FlatOpaque;
    private _alphaValue = 1.0;

    init(): void {
        // Disable the object on init
        wlUtils.setActive(this.object, false);
        this.object.resetPosition();
    }

    start() {
        const meshComponent = this.fadeObject.getComponent(MeshComponent);
        if (!meshComponent) {
            console.error(
                'FadeToBlack component requires a mesh component on the fadeObject'
            );
            return;
        }
        this._fadeMaterial = meshComponent.material as FlatOpaque;
        if (!this._fadeMaterial) {
            console.error(
                'FadeToBlack component requires a FlatOpaque material on the fadeObject'
            );
            return;
        }
    }

    private _resolve: (value: void | PromiseLike<void>) => void = () => {};

    fadeToBlack(): Promise<void> {
        this._transitionInProgress = TransitionType.FadeToBlack;
        this._setObjectsActive();
        this._alphaValue = 0;
        this._fadeMaterial.setColor(this.fadeColor);
        const completionPromise = new Promise<void>((r) => (this._resolve = r));
        return completionPromise;
    }

    fadeFromBlack(): Promise<void> {
        this._transitionInProgress = TransitionType.FadeFromBlack;
        this._setObjectsActive();
        this._alphaValue = 1;
        this._fadeMaterial.setColor(this.fadeColor);
        const completionPromise = new Promise<void>((r) => (this._resolve = r));
        return completionPromise;
    }

    private _setObjectsActive() {
        wlUtils.setActive(this.object, true);
        if (
            this._transitionInProgress === TransitionType.FadeToBlack ||
            this._transitionInProgress === TransitionType.FadeFromBlack
        ) {
            wlUtils.setActive(this.fadeObject, true);
        }
    }

    update(dt: number) {
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
        } else if (this._transitionInProgress === TransitionType.FadeFromBlack) {
            this._alphaValue -= dt / this.fadeTransitionTime;
            if (this._alphaValue <= 0) {
                this._alphaValue = 0;
                wlUtils.setActive(this.object, false);
                this._transitionInProgress = TransitionType.None;
                this._resolve();
            }
        }

        if (
            this._transitionInProgress === TransitionType.FadeFromBlack ||
            this._transitionInProgress === TransitionType.FadeToBlack
        ) {
            this._fadeMaterial.setColor([
                this.fadeColor[0],
                this.fadeColor[1],
                this.fadeColor[2],
                this._alphaValue,
            ]);
        }
    }
}
