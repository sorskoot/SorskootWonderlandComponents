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
    /** Component registration name in Wonderland Engine */
    static TypeName: string;
    /**
     * The object that will be faded
     */
    fadeObject: Object3D;
    /**
     * Time in seconds for the fade transition
     */
    fadeTransitionTime: number;
    /**
     * Color to fade to/from [r, g, b, a]
     */
    fadeColor: number[];
    /** Current transition state */
    private _transitionInProgress;
    /** Material used for fading */
    private _fadeMaterial;
    /** Current alpha value */
    private _alphaValue;
    /** Promise resolver function */
    private _resolve;
    /**
     * Initialize the component
     */
    init(): void;
    /**
     * Validate required properties and setup component
     */
    start(): void;
    /**
     * Begin fade to black transition
     * @returns Promise that resolves when fade is complete
     */
    fadeToBlack(): Promise<void>;
    /**
     * Begin fade from black transition
     * @returns Promise that resolves when fade is complete
     */
    fadeFromBlack(): Promise<void>;
    /**
     * Start a transition with the specified type and initial alpha
     * @param type Type of transition to start
     * @param initialAlpha Initial alpha value
     * @returns Promise that resolves when transition is complete
     */
    private _startTransition;
    /**
     * Set objects active based on current transition state
     */
    private _setObjectsActive;
    /**
     * Update the component each frame
     * @param dt Delta time since last frame
     */
    update(dt: number): void;
    /**
     * Updates the material color with the current alpha value
     */
    private _updateMaterialColor;
}
