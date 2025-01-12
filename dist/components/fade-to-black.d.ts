import { Component, Object3D } from '@wonderlandengine/api';
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
export declare class FadeToBlack extends Component {
    static TypeName: string;
    fadeObject: Object3D;
    fadeTransitionTime: number;
    fadeColor: number[];
    private _transitionInProgress;
    private _fadeMaterial;
    private _alphaValue;
    init(): void;
    start(): void;
    private _resolve;
    fadeToBlack(): Promise<void>;
    fadeFromBlack(): Promise<void>;
    private _setObjectsActive;
    update(dt: number): void;
}
