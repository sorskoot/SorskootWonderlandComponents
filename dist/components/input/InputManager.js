import { vec2 } from 'gl-matrix';
/**
 * Types of key events that can occur
 */
export var KeyEventType;
(function (KeyEventType) {
    KeyEventType[KeyEventType["Triggered"] = 0] = "Triggered";
    KeyEventType[KeyEventType["Pressed"] = 1] = "Pressed";
    KeyEventType[KeyEventType["Released"] = 2] = "Released";
    KeyEventType[KeyEventType["None"] = 3] = "None";
})(KeyEventType || (KeyEventType = {}));
/**
 * Types of keys/buttons that can be used for input
 */
export var KeyType;
(function (KeyType) {
    KeyType[KeyType["Nothing"] = 0] = "Nothing";
    KeyType[KeyType["Button1"] = 1] = "Button1";
    KeyType[KeyType["Button2"] = 2] = "Button2";
    KeyType[KeyType["Left"] = 3] = "Left";
    KeyType[KeyType["Right"] = 4] = "Right";
    KeyType[KeyType["Up"] = 5] = "Up";
    KeyType[KeyType["Down"] = 6] = "Down";
    KeyType[KeyType["Pause"] = 7] = "Pause";
    KeyType[KeyType["Back"] = 8] = "Back";
    KeyType[KeyType["Menu1"] = 9] = "Menu1";
    KeyType[KeyType["Menu2"] = 10] = "Menu2";
    KeyType[KeyType["Menu3"] = 11] = "Menu3";
    KeyType[KeyType["Menu4"] = 12] = "Menu4";
    KeyType[KeyType["Menu5"] = 13] = "Menu5";
})(KeyType || (KeyType = {}));
/**
 * Manages input from various sources including touch and key presses
 * Implements the Singleton pattern for global access
 */
export class InputManager {
    /**
     * Gets the singleton instance of InputManager
     */
    static get instance() {
        var _a;
        return (_a = InputManager._instance) !== null && _a !== void 0 ? _a : (InputManager._instance = new InputManager());
    }
    /**
     * Private constructor to enforce singleton pattern
     */
    constructor() {
        this._lastTouch = {
            position: vec2.create(),
            type: KeyEventType.None,
        };
        this._keyStatus = new Map();
        this._reset();
    }
    /**
     * Checks if a key is currently pressed
     * @param keyType The type of key to check
     * @returns True if the key is pressed, false otherwise
     */
    static getKey(keyType) {
        return InputManager.instance.getKeyStatus(keyType) === KeyEventType.Pressed;
    }
    /**
     * Records a touch event with position and type
     * @param position The position of the touch [x, y]
     * @param type The type of touch event
     */
    recordTouch(position, type) {
        vec2.set(this._lastTouch.position, position[0], position[1]);
        this._lastTouch.type = type;
    }
    /**
     * Gets the position of a touch point
     * @param pointerIndex The index of the pointer to get position for
     * @returns The position as a vec2
     */
    getTouchPoint(pointerIndex) {
        return this._lastTouch.position;
    }
    /**
     * Checks if a touch is currently pressed
     * @param pointerIndex The index of the pointer to check
     * @returns True if the touch is pressed, false otherwise
     */
    getTouchPressed(pointerIndex) {
        return this._lastTouch.type === KeyEventType.Pressed;
    }
    /**
     * Checks if a touch was just triggered
     * @param pointerIndex The index of the pointer to check
     * @returns True if the touch was triggered, false otherwise
     */
    getTouchTriggered(pointerIndex) {
        return this._lastTouch.type === KeyEventType.Triggered;
    }
    /**
     * Checks if a touch was just released
     * @param pointerIndex The index of the pointer to check
     * @returns True if the touch was released, false otherwise
     */
    getTouchReleased(pointerIndex) {
        return this._lastTouch.type === KeyEventType.Released;
    }
    /**
     * Gets the current status of a key
     * @param action The key type to check
     * @returns The current event type for the key
     */
    getKeyStatus(action) {
        return this._keyStatus.get(action);
    }
    /**
     * Records a key event
     * @param key The key that was acted upon
     * @param event The type of event that occurred
     */
    recordKey(key, event) {
        if (event !== KeyEventType.None) {
            this._keyStatus.set(key, event);
        }
    }
    /**
     * Resets all key statuses to None
     */
    _reset() {
        for (let key in KeyType) {
            if (isNaN(Number(key))) {
                this._keyStatus.set(KeyType[key], KeyEventType.None);
            }
        }
    }
}
