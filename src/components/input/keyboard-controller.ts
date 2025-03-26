import { Component } from '@wonderlandengine/api';
import { InputManager, KeyEventType } from './InputManager.js';

export class KeyboardController extends Component {
    static TypeName = 'keyboard-controller';

    // Singleton
    private static _instance: KeyboardController;

    static get instance(): KeyboardController {
        return KeyboardController._instance;
    }

    private _inputManager!: InputManager;

    private _upCodes = ['KeyW', 'ArrowUp', 'Numpad8'];
    private _downCodes = ['KeyS', 'ArrowDown', 'Numpad2'];
    private _leftCodes = ['KeyA', 'ArrowLeft', 'Numpad4'];
    private _rightCodes = ['KeyD', 'ArrowRight', 'Numpad6'];
    private _spaceCodes = ['Space'];
    private _escapeCodes = ['Escape'];

    private _keyboardMap = new Map<KeyboardController.KeyType, string[]>([
        [KeyboardController.KeyType.Up, this._upCodes],
        [KeyboardController.KeyType.Down, this._downCodes],
        [KeyboardController.KeyType.Left, this._leftCodes],
        [KeyboardController.KeyType.Right, this._rightCodes],
        [KeyboardController.KeyType.Button1, this._spaceCodes],
        [KeyboardController.KeyType.Back, this._escapeCodes],
    ]);

    private _pressedKeys: {
        [key in KeyType]?: KeyboardController.KeyPressState;
    } = {};

    init() {
        if (KeyboardController._instance) {
            console.error(
                'There can only be one instance of InputManager Component'
            );
        }
        KeyboardController._instance = this;
    }

    start(): void {
        this._inputManager = InputManager.instance;
    }

    update(delta: number): void {
        const toBeDeleted: KeyboardController.KeyType[] = [];
        for (const key in this._pressedKeys) {
            if (this._pressedKeys.hasOwnProperty(key)) {
                const typedKey = +key as KeyboardController.KeyType;
                const value = this._pressedKeys[typedKey];

                if (value === KeyboardController.KeyPressState.Pressed) {
                    this._inputManager.recordKey(
                        typedKey,
                        KeyEventType.Triggered
                    );
                    this._pressedKeys[typedKey] =
                        KeyboardController.KeyPressState.Down;
                } else if (value === KeyboardController.KeyPressState.Down) {
                    this._inputManager.recordKey(
                        typedKey,
                        KeyEventType.Pressed
                    );
                    this._pressedKeys[typedKey] =
                        KeyboardController.KeyPressState.StayDown;
                } else if (value === KeyboardController.KeyPressState.Up) {
                    this._inputManager.recordKey(
                        typedKey,
                        KeyEventType.Released
                    );
                    toBeDeleted.push(typedKey);
                    this._pressedKeys[typedKey] =
                        KeyboardController.KeyPressState.None;
                }
            }
        }

        toBeDeleted.forEach((key) => {
            delete this._pressedKeys[key];
        });
    }

    onActivate(): void {
        window.addEventListener('keydown', this._onKeyDown);
        window.addEventListener('keyup', this._onKeyUp);
    }

    onDeactivate(): void {
        window.removeEventListener('keydown', this._onKeyDown);
        window.removeEventListener('keyup', this._onKeyUp);
    }

    private _getTypeFromCode(
        code: string
    ): KeyboardController.KeyType | undefined {
        for (const [type, codes] of this._keyboardMap) {
            if (codes.includes(code)) {
                return type;
            }
        }
        return undefined;
    }

    private _onKeyDown = (event: KeyboardEvent) => {
        const t = this._getTypeFromCode(event.code);
        if (t === undefined || this._pressedKeys[t]) {
            /* key was already pressed */
            return;
        }
        this._pressedKeys[t] = KeyboardController.KeyPressState.Pressed;
    };

    private _onKeyUp = (event: KeyboardEvent) => {
        const t = this._getTypeFromCode(event.code);
        if (
            t &&
            this._pressedKeys[t] &&
            this._pressedKeys[t] !== KeyboardController.KeyPressState.Up
        ) {
            this._pressedKeys[t] = KeyboardController.KeyPressState.Up;
        }
    };
}

export namespace KeyboardController {
    export enum KeyPressState {
        None,
        Pressed,
        Down,
        StayDown,
        Up,
    }

    export type KeyStates = {
        [key in KeyType]: KeyPressState;
    };

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
}
