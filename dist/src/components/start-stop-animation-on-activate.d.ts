import { Component } from '@wonderlandengine/api';
/**
 * This component starts or stops the animation of the object it is attached to
 * Starts when the object is activated, stops when it is deactivated.
 *
 * Works only on Wonderland Animations
 */
export declare class StartStopAnimationOnActivate extends Component {
    static TypeName: string;
    onActivate(): void;
    onDeactivate(): void;
}
