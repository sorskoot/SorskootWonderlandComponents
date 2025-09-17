import { Assert } from './Assert.js';
export const STOP_PROPAGATION = 'stop_propagation';
/**
 * Signal implementation for event handling.
 * Allows adding and removing listeners that get called when the signal is dispatched.
 */
export class Signal {
    _receivers = [];
    _modifyCount = 0;
    /**
     * Adds a new signal listener
     * @param receiver - The function to call when the signal is dispatched
     * @param scope - The scope to apply when calling the receiver
     */
    add(receiver, scope) {
        Assert.isNotNull(receiver);
        this._receivers.push({ receiver, scope });
        ++this._modifyCount;
    }
    /**
     * Adds a new signal listener to the top of the stack
     * @param receiver - The function to call when the signal is dispatched
     * @param scope - The scope to apply when calling the receiver
     */
    addToTop(receiver, scope) {
        Assert.isNotNull(receiver);
        this._receivers.unshift({ receiver, scope });
        ++this._modifyCount;
    }
    /**
     * Dispatches the signal to all receivers
     * @param payload - Arguments to pass to the receivers
     * @returns STOP_PROPAGATION if propagation was stopped, void otherwise
     */
    dispatch(...payload) {
        const modifyState = this._modifyCount;
        const n = this._receivers.length;
        for (let i = 0; i < n; ++i) {
            const { receiver, scope } = this._receivers[i];
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
    remove(receiver) {
        let index = null;
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
    removeAll() {
        this._receivers = [];
        ++this._modifyCount;
    }
}
