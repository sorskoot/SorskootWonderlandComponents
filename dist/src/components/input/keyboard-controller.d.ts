import { Component } from '@wonderlandengine/api';
import { KeyType } from './InputManager.js';
/**
 * Component that handles keyboard input and converts it to a standardized input format.
 * Works with the InputManager to provide unified input handling across different devices.
 *
 * This component implements a state machine for keyboard input:
 * - Pressed: Initial state when a key is first pressed
 * - Down: Key has been pressed for one frame
 * - StayDown: Key continues to be pressed
 * - Up: Key has been released
 * - None: Key is not being interacted with
 *
 * Usage:
 * Add this component to an object in your scene. Only one instance should exist.
 * The component will automatically connect to the InputManager and start sending
 * keyboard events through the standardized input system.
 */
export declare class KeyboardController extends Component {
    static TypeName: string;
    private static _instance;
    /**
     * Gets the singleton instance of KeyboardController
     * @throws Error if the instance hasn't been initialized yet
     */
    static get instance(): KeyboardController;
    private _inputManager;
    private readonly _upCodes;
    private readonly _downCodes;
    private readonly _leftCodes;
    private readonly _rightCodes;
    private readonly _spaceCodes;
    private readonly _escapeCodes;
    private readonly _keyboardMap;
    private _pressedKeys;
    /**
     * Initialize the component and setup the singleton instance
     */
    init(): void;
    /**
     * Start the component and get reference to the InputManager
     * @throws Error if InputManager instance cannot be found
     */
    start(): void;
    /**
     * Process the keyboard states each frame and update the InputManager.
     * Implements the state machine for key presses:
     * Pressed -> Down -> StayDown (stays in this state until released)
     * Up -> None (key is removed from tracking)
     *
     * @param delta Time since last frame in seconds
     */
    update(delta: number): void;
    /**
     * Register event listeners when component is activated
     */
    onActivate(): void;
    /**
     * Remove event listeners when component is deactivated
     */
    onDeactivate(): void;
    /**
     * Maps a keyboard code to the corresponding input type
     * @param code The keyboard code to check
     * @returns The corresponding KeyType or undefined if not mapped
     */
    private _getTypeFromCode;
    /**
     * Event handler for keydown events
     * @param event The keyboard event
     */
    private _onKeyDown;
    /**
     * Event handler for keyup events
     * @param event The keyboard event
     */
    private _onKeyUp;
    /**
     * Clean up when component is destroyed
     */
    onDestroy(): void;
}
export declare namespace KeyboardController {
    /**
     * States a key can be in during processing
     */
    enum KeyPressState {
        /** Key is not being tracked */
        None = 0,
        /** Key was just pressed this frame */
        Pressed = 1,
        /** Key has been pressed for one frame */
        Down = 2,
        /** Key continues to be held down */
        StayDown = 3,
        /** Key was just released */
        Up = 4
    }
    /**
     * Type definition for tracking all key states
     */
    type KeyStates = {
        [key in KeyType]?: KeyPressState;
    };
}
