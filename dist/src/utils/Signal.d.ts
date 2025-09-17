export declare const STOP_PROPAGATION: "stop_propagation";
export type STOP_PROPAGATION = typeof STOP_PROPAGATION;
export type SignalReceiver<T extends unknown[]> = (...args: T) => STOP_PROPAGATION | void;
/**
 * Signal implementation for event handling.
 * Allows adding and removing listeners that get called when the signal is dispatched.
 */
export declare class Signal<T extends unknown[] = []> {
    private _receivers;
    private _modifyCount;
    /**
     * Adds a new signal listener
     * @param receiver - The function to call when the signal is dispatched
     * @param scope - The scope to apply when calling the receiver
     */
    add(receiver: SignalReceiver<T>, scope: object): void;
    /**
     * Adds a new signal listener to the top of the stack
     * @param receiver - The function to call when the signal is dispatched
     * @param scope - The scope to apply when calling the receiver
     */
    addToTop(receiver: SignalReceiver<T>, scope: object): void;
    /**
     * Dispatches the signal to all receivers
     * @param payload - Arguments to pass to the receivers
     * @returns STOP_PROPAGATION if propagation was stopped, void otherwise
     */
    dispatch(...payload: T): void | STOP_PROPAGATION;
    /**
     * Removes a specific receiver
     * @param receiver - The receiver to remove
     */
    remove(receiver: SignalReceiver<T>): void;
    /**
     * Removes all receivers
     */
    removeAll(): void;
}
