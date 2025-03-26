import {vec2} from 'gl-matrix';

/**
 * Types of key events that can occur
 */
export enum KeyEventType {
    Triggered,
    Pressed,
    Released,
    None,
}

/**
 * Types of keys/buttons that can be used for input
 */
export enum KeyType {
    Nothing = 0,
    Button1 = 1,
    Button2,
    Left,
    Right,
    Up,
    Down,
    Pause,
    Back,
    Menu1,
    Menu2,
    Menu3,
    Menu4,
    Menu5,
}

/**
 * Structure to store touch input data
 */
type TouchRecord = {
    position: vec2;
    type: KeyEventType;
};

/**
 * Manages input from various sources including touch and key presses
 * Implements the Singleton pattern for global access
 */
export class InputManager {
    private static _instance: InputManager;

    /**
     * Gets the singleton instance of InputManager
     */
    public static get instance(): InputManager {
        return InputManager._instance ?? (InputManager._instance = new InputManager());
    }

    private readonly _lastTouch: TouchRecord = {
        position: vec2.create(),
        type: KeyEventType.None,
    };

    private _keyStatus: Map<KeyType, KeyEventType> = new Map();

    /**
     * Private constructor to enforce singleton pattern
     */
    private constructor() {
        this._reset();
    }

    /**
     * Checks if a key is currently pressed
     * @param keyType The type of key to check
     * @returns True if the key is pressed, false otherwise
     */
    public static getKey(keyType: KeyType): boolean {
        return InputManager.instance.getKeyStatus(keyType) === KeyEventType.Pressed;
    }

    /**
     * Records a touch event with position and type
     * @param position The position of the touch [x, y]
     * @param type The type of touch event
     */
    public recordTouch(position: number[], type: KeyEventType): void {
        vec2.set(this._lastTouch.position, position[0], position[1]);
        this._lastTouch.type = type;
    }

    /**
     * Gets the position of a touch point
     * @param pointerIndex The index of the pointer to get position for
     * @returns The position as a vec2
     */
    public getTouchPoint(pointerIndex: number): vec2 {
        return this._lastTouch.position;
    }

    /**
     * Checks if a touch is currently pressed
     * @param pointerIndex The index of the pointer to check
     * @returns True if the touch is pressed, false otherwise
     */
    public getTouchPressed(pointerIndex: number): boolean {
        return this._lastTouch.type === KeyEventType.Pressed;
    }

    /**
     * Checks if a touch was just triggered
     * @param pointerIndex The index of the pointer to check
     * @returns True if the touch was triggered, false otherwise
     */
    public getTouchTriggered(pointerIndex: number): boolean {
        return this._lastTouch.type === KeyEventType.Triggered;
    }

    /**
     * Checks if a touch was just released
     * @param pointerIndex The index of the pointer to check
     * @returns True if the touch was released, false otherwise
     */
    public getTouchReleased(pointerIndex: number): boolean {
        return this._lastTouch.type === KeyEventType.Released;
    }

    /**
     * Gets the current status of a key
     * @param action The key type to check
     * @returns The current event type for the key
     */
    public getKeyStatus(action: KeyType): KeyEventType | undefined {
        return this._keyStatus.get(action);
    }

    /**
     * Records a key event
     * @param key The key that was acted upon
     * @param event The type of event that occurred
     */
    public recordKey(key: KeyType, event: KeyEventType): void {
        if (event !== KeyEventType.None) {
            this._keyStatus.set(key, event);
        }
    }

    /**
     * Resets all key statuses to None
     */
    private _reset(): void {
        for (let key in KeyType) {
            if (isNaN(Number(key))) {
                this._keyStatus.set(
                    KeyType[key as keyof typeof KeyType],
                    KeyEventType.None
                );
            }
        }
    }
}
