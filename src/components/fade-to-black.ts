import {Component, MeshComponent, Object3D} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';
import type {FlatOpaque} from '../types/materials.js';
import {wlUtils} from '../utils/wlUtils.js';

/**
 * Enum representing the current transition state
 */
enum TransitionType {
    /** Fading to black (increasing alpha) */
    FadeToBlack,
    /** Fading from black (decreasing alpha) */
    FadeFromBlack,
    /** No transition in progress */
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
    /** Component registration name in Wonderland Engine */
    static TypeName = 'fade-to-black';

    /**
     * The object that will be faded
     */
    @property.object({required: true})
    fadeObject!: Object3D;

    /**
     * Time in seconds for the fade transition
     */
    @property.float(0.5)
    fadeTransitionTime = 0.5;

    /**
     * Color to fade to/from [r, g, b, a]
     */
    @property.color(0.0, 0.0, 0.0, 1.0)
    fadeColor = [0.0, 0.0, 0.0, 1.0];

    /** Current transition state */
    private _transitionInProgress = TransitionType.None;

    /** Material used for fading */
    private _fadeMaterial!: FlatOpaque;

    /** Current alpha value */
    private _alphaValue = 1.0;

    /** Promise resolver function */
    private _resolve: (value: void) => void = () => {};

    /**
     * Initialize the component
     */
    init(): void {
        // Disable the object on init
        wlUtils.setActive(this.object, false);
        this.object.resetPosition();
    }

    /**
     * Validate required properties and setup component
     */
    start(): void {
        if (!this.fadeObject) {
            throw new Error('fade-to-black: fadeObject is required');
        }

        if (this.fadeTransitionTime <= 0) {
            throw new Error('fade-to-black: fadeTransitionTime must be greater than 0');
        }

        const meshComponent = this.fadeObject.getComponent(MeshComponent);
        if (!meshComponent) {
            throw new Error('fade-to-black: fadeObject must have a MeshComponent');
        }

        this._fadeMaterial = meshComponent.material as FlatOpaque;
        if (!this._fadeMaterial) {
            throw new Error('fade-to-black: fadeObject must have a FlatOpaque material');
        }
    }

    /**
     * Begin fade to black transition
     * @returns Promise that resolves when fade is complete
     */
    fadeToBlack(): Promise<void> {
        return this._startTransition(TransitionType.FadeToBlack, 0);
    }

    /**
     * Begin fade from black transition
     * @returns Promise that resolves when fade is complete
     */
    fadeFromBlack(): Promise<void> {
        return this._startTransition(TransitionType.FadeFromBlack, 1);
    }

    /**
     * Start a transition with the specified type and initial alpha
     * @param type Type of transition to start
     * @param initialAlpha Initial alpha value
     * @returns Promise that resolves when transition is complete
     */
    private _startTransition(type: TransitionType, initialAlpha: number): Promise<void> {
        this._transitionInProgress = type;
        this._setObjectsActive();
        this._alphaValue = initialAlpha;
        this._fadeMaterial.setColor(this.fadeColor);
        return new Promise<void>((resolve) => (this._resolve = resolve));
    }

    /**
     * Set objects active based on current transition state
     */
    private _setObjectsActive(): void {
        wlUtils.setActive(this.object, true);
        if (
            this._transitionInProgress === TransitionType.FadeToBlack ||
            this._transitionInProgress === TransitionType.FadeFromBlack
        ) {
            wlUtils.setActive(this.fadeObject, true);
        }
    }

    /**
     * Update the component each frame
     * @param dt Delta time since last frame
     */
    update(dt: number): void {
        if (this._transitionInProgress === TransitionType.None) {
            return;
        }

        // Handle different transition types
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

        // Update material color with current alpha value
        this._updateMaterialColor();
    }

    /**
     * Updates the material color with the current alpha value
     */
    private _updateMaterialColor(): void {
        this._fadeMaterial.setColor([
            this.fadeColor[0],
            this.fadeColor[1],
            this.fadeColor[2],
            this._alphaValue,
        ]);
    }
}
