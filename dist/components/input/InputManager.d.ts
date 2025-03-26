import { vec2 } from 'gl-matrix';
/**
 * Types of key events that can occur
 */
export declare enum KeyEventType {
    Triggered = 0,
    Pressed = 1,
    Released = 2,
    None = 3
}
/**
 * Types of keys/buttons that can be used for input
 */
export declare enum KeyType {
    Nothing = 0,
    Button1 = 1,
    Button2 = 2,
    Left = 3,
    Right = 4,
    Up = 5,
    Down = 6,
    Pause = 7,
    Back = 8,
    Menu1 = 9,
    Menu2 = 10,
    Menu3 = 11,
    Menu4 = 12,
    Menu5 = 13
}
/**
 * Manages input from various sources including touch and key presses
 * Implements the Singleton pattern for global access
 */
export declare class InputManager {
    private static _instance;
    /**
     * Gets the singleton instance of InputManager
     */
    static get instance(): InputManager;
    private readonly _lastTouch;
    private _keyStatus;
    /**
     * Private constructor to enforce singleton pattern
     */
    private constructor();
    /**
     * Checks if a key is currently pressed
     * @param keyType The type of key to check
     * @returns True if the key is pressed, false otherwise
     */
    static getKey(keyType: KeyType): boolean;
    /**
     * Records a touch event with position and type
     * @param position The position of the touch [x, y]
     * @param type The type of touch event
     */
    recordTouch(position: number[], type: KeyEventType): void;
    /**
     * Gets the position of a touch point
     * @param pointerIndex The index of the pointer to get position for
     * @returns The position as a vec2
     */
    getTouchPoint(pointerIndex: number): vec2;
    /**
     * Checks if a touch is currently pressed
     * @param pointerIndex The index of the pointer to check
     * @returns True if the touch is pressed, false otherwise
     */
    getTouchPressed(pointerIndex: number): boolean;
    /**
     * Checks if a touch was just triggered
     * @param pointerIndex The index of the pointer to check
     * @returns True if the touch was triggered, false otherwise
     */
    getTouchTriggered(pointerIndex: number): boolean;
    /**
     * Checks if a touch was just released
     * @param pointerIndex The index of the pointer to check
     * @returns True if the touch was released, false otherwise
     */
    getTouchReleased(pointerIndex: number): boolean;
    /**
     * Gets the current status of a key
     * @param action The key type to check
     * @returns The current event type for the key
     */
    getKeyStatus(action: KeyType): KeyEventType | undefined;
    /**
     * Records a key event
     * @param key The key that was acted upon
     * @param event The type of event that occurred
     */
    recordKey(key: KeyType, event: KeyEventType): void;
    /**
     * Resets all key statuses to None
     */
    private _reset;
}
