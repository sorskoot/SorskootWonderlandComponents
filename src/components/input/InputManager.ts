import { vec2, vec3 } from 'gl-matrix';

export enum KeyEventType {
    Triggered,
    Pressed,
    Released,
    None,
    a,
}
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

type TouchRecord = {
    position: vec2;
    type: KeyEventType;
};

export class InputManager {
    static _instance: InputManager;
    static get instance() {
        return (
            InputManager._instance ??
            (InputManager._instance = new InputManager())
        );
    }

    private readonly _lastTouch: TouchRecord = {
        position: vec2.create(),
        type: KeyEventType.None,
    };

    private _keyStatus: Map<KeyType, KeyEventType> = new Map();

    private constructor() {
        this._reset();
    }

    static getKey(keyType: KeyType): boolean {
        return (
            InputManager.instance.getKeyStatus(keyType) == KeyEventType.Pressed
        );
    }

    recordTouch(position: number[], type: KeyEventType) {
        vec2.set(this._lastTouch.position, position[0], position[1]);
        this._lastTouch.type = type;
    }

    getTouchPoint(pointerIndex: number): vec2 {
        return this._lastTouch.position;
    }

    getTouchPressed(pointerIndex: number) {
        return this._lastTouch.type == KeyEventType.Pressed;
    }

    getTouchTriggered(pointerIndex: number) {
        return this._lastTouch.type == KeyEventType.Triggered;
    }

    getTouchReleased(pointerIndex: number) {
        return this._lastTouch.type == KeyEventType.Released;
    }

    getKeyStatus(action: KeyType) {
        return this._keyStatus.get(action);
    }

    recordKey(key: KeyType, event: KeyEventType) {
        if (event != KeyEventType.None) {
            this._keyStatus.set(key, event);
        }
    }

    private _reset() {
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
