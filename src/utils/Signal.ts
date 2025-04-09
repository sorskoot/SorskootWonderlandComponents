import {Assert} from './Assert.js';

export const STOP_PROPAGATION = 'stop_propagation' as const;
export type STOP_PROPAGATION = typeof STOP_PROPAGATION;

export type SignalReceiver<T extends unknown[]> = (...args: T) => STOP_PROPAGATION | void;

/**
 * Signal implementation for event handling.
 * Allows adding and removing listeners that get called when the signal is dispatched.
 */
export class Signal<T extends unknown[] = []> {
    private _receivers: {receiver: SignalReceiver<T>; scope: object}[] = [];
    private _modifyCount: number = 0;

    /**
     * Adds a new signal listener
     * @param receiver - The function to call when the signal is dispatched
     * @param scope - The scope to apply when calling the receiver
     */
    public add(receiver: SignalReceiver<T>, scope: object): void {
        Assert.isNotNull(receiver);
        this._receivers.push({receiver, scope});
        ++this._modifyCount;
    }

    /**
     * Adds a new signal listener to the top of the stack
     * @param receiver - The function to call when the signal is dispatched
     * @param scope - The scope to apply when calling the receiver
     */
    public addToTop(receiver: SignalReceiver<T>, scope: object): void {
        Assert.isNotNull(receiver);
        this._receivers.unshift({receiver, scope});
        ++this._modifyCount;
    }

    /**
     * Dispatches the signal to all receivers
     * @param payload - Arguments to pass to the receivers
     * @returns STOP_PROPAGATION if propagation was stopped, void otherwise
     */
    public dispatch(...payload: T): void | STOP_PROPAGATION {
        const modifyState = this._modifyCount;

        const n = this._receivers.length;
        for (let i = 0; i < n; ++i) {
            const {receiver, scope} = this._receivers[i];
            if (receiver.apply(scope, payload) === STOP_PROPAGATION) {
                return STOP_PROPAGATION;
            }

            if (modifyState !== this._modifyCount) {
                // Signal got modified during iteration
                return STOP_PROPAGATION;
            }
        }
    }

    /**
     * Removes a specific receiver
     * @param receiver - The receiver to remove
     */
    public remove(receiver: SignalReceiver<T>): void {
        let index: number | null = null;
        const n = this._receivers.length;
        for (let i = 0; i < n; ++i) {
            if (this._receivers[i].receiver === receiver) {
                index = i;
                break;
            }
        }

        if (index === null) {
            throw new Error('Receiver not found in list');
        }

        this._receivers.splice(index, 1);
        ++this._modifyCount;
    }

    /**
     * Removes all receivers
     */
    public removeAll(): void {
        this._receivers = [];
        ++this._modifyCount;
    }
}
