import { Component } from '@wonderlandengine/api';
import { InputManager, KeyEventType, KeyType } from './InputManager.js';
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
export class KeyboardController extends Component {
    static TypeName = 'keyboard-controller';
    // Singleton instance
    static _instance = null;
    /**
     * Gets the singleton instance of KeyboardController
     * @throws Error if the instance hasn't been initialized yet
     */
    static get instance() {
        if (!KeyboardController._instance) {
            throw new Error('KeyboardController: Instance not yet initialized. Make sure the component is active in your scene.');
        }
        return KeyboardController._instance;
    }
    _inputManager;
    _upCodes = ['KeyW', 'ArrowUp', 'Numpad8'];
    _downCodes = ['KeyS', 'ArrowDown', 'Numpad2'];
    _leftCodes = ['KeyA', 'ArrowLeft', 'Numpad4'];
    _rightCodes = ['KeyD', 'ArrowRight', 'Numpad6'];
    _spaceCodes = ['Space'];
    _escapeCodes = ['Escape'];
    _keyboardMap = new Map([
        [KeyType.Up, this._upCodes],
        [KeyType.Down, this._downCodes],
        [KeyType.Left, this._leftCodes],
        [KeyType.Right, this._rightCodes],
        [KeyType.Button1, this._spaceCodes],
        [KeyType.Back, this._escapeCodes],
    ]);
    _pressedKeys = {};
    /**
     * Initialize the component and setup the singleton instance
     */
    init() {
        if (KeyboardController._instance) {
            throw new Error('KeyboardController: There can only be one instance of KeyboardController Component');
        }
        KeyboardController._instance = this;
    }
    /**
     * Start the component and get reference to the InputManager
     * @throws Error if InputManager instance cannot be found
     */
    start() {
        try {
            this._inputManager = InputManager.instance;
        }
        catch (error) {
            throw new Error('KeyboardController: Failed to get InputManager instance. Make sure InputManager is active in your scene.');
        }
    }
    /**
     * Process the keyboard states each frame and update the InputManager.
     * Implements the state machine for key presses:
     * Pressed -> Down -> StayDown (stays in this state until released)
     * Up -> None (key is removed from tracking)
     *
     * @param delta Time since last frame in seconds
     */
    update(delta) {
        const toBeDeleted = [];
        for (const key in this._pressedKeys) {
            if (this._pressedKeys.hasOwnProperty(key)) {
                const keyType = Number(key);
                const keyState = this._pressedKeys[keyType];
                if (keyState === KeyboardController.KeyPressState.Pressed) {
                    // First frame of press - trigger initial event
                    this._inputManager.recordKey(keyType, KeyEventType.Triggered);
                    this._pressedKeys[keyType] = KeyboardController.KeyPressState.Down;
                }
                else if (keyState === KeyboardController.KeyPressState.Down) {
                    // Second frame of press - switch to continuous press
                    this._inputManager.recordKey(keyType, KeyEventType.Pressed);
                    this._pressedKeys[keyType] = KeyboardController.KeyPressState.StayDown;
                }
                else if (keyState === KeyboardController.KeyPressState.Up) {
                    // Key was released - send release event and mark for cleanup
                    this._inputManager.recordKey(keyType, KeyEventType.Released);
                    toBeDeleted.push(keyType);
                    this._pressedKeys[keyType] = KeyboardController.KeyPressState.None;
                }
                // StayDown state doesn't need any processing - it remains in this state
            }
        }
        // Clean up released keys
        toBeDeleted.forEach((keyType) => {
            delete this._pressedKeys[keyType];
        });
    }
    /**
     * Register event listeners when component is activated
     */
    onActivate() {
        window.addEventListener('keydown', this._onKeyDown);
        window.addEventListener('keyup', this._onKeyUp);
    }
    /**
     * Remove event listeners when component is deactivated
     */
    onDeactivate() {
        window.removeEventListener('keydown', this._onKeyDown);
        window.removeEventListener('keyup', this._onKeyUp);
    }
    /**
     * Maps a keyboard code to the corresponding input type
     * @param code The keyboard code to check
     * @returns The corresponding KeyType or undefined if not mapped
     */
    _getTypeFromCode(code) {
        for (const [type, codes] of this._keyboardMap) {
            if (codes.includes(code)) {
                return type;
            }
        }
        return undefined;
    }
    /**
     * Event handler for keydown events
     * @param event The keyboard event
     */
    _onKeyDown = (event) => {
        const keyType = this._getTypeFromCode(event.code);
        if (keyType === undefined || this._pressedKeys[keyType]) {
            /* key was already pressed or not mapped */
            return;
        }
        this._pressedKeys[keyType] = KeyboardController.KeyPressState.Pressed;
    };
    /**
     * Event handler for keyup events
     * @param event The keyboard event
     */
    _onKeyUp = (event) => {
        const keyType = this._getTypeFromCode(event.code);
        if (keyType !== undefined &&
            this._pressedKeys[keyType] &&
            this._pressedKeys[keyType] !== KeyboardController.KeyPressState.Up) {
            this._pressedKeys[keyType] = KeyboardController.KeyPressState.Up;
        }
    };
    /**
     * Clean up when component is destroyed
     */
    onDestroy() {
        if (KeyboardController._instance === this) {
            KeyboardController._instance = null;
        }
    }
}
(function (KeyboardController) {
    /**
     * States a key can be in during processing
     */
    let KeyPressState;
    (function (KeyPressState) {
        /** Key is not being tracked */
        KeyPressState[KeyPressState["None"] = 0] = "None";
        /** Key was just pressed this frame */
        KeyPressState[KeyPressState["Pressed"] = 1] = "Pressed";
        /** Key has been pressed for one frame */
        KeyPressState[KeyPressState["Down"] = 2] = "Down";
        /** Key continues to be held down */
        KeyPressState[KeyPressState["StayDown"] = 3] = "StayDown";
        /** Key was just released */
        KeyPressState[KeyPressState["Up"] = 4] = "Up";
    })(KeyPressState = KeyboardController.KeyPressState || (KeyboardController.KeyPressState = {}));
})(KeyboardController || (KeyboardController = {}));
