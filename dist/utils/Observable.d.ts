export type Observer<T> = (data: T) => void;
/**
 * Simple observable container that notifies subscribed observers when
 * its value changes.
 */
export declare class Observable<T> {
    private _observers;
    private _value;
    /**
     * Create a new Observable.
     * @param initialValue Optional initial value for the observable.
     */
    constructor(initialValue?: T);
    /**
     * Current value of the observable.
     */
    get value(): T;
    /**
     * Set the value and notify all observers.
     * @param newValue New value to set.
     */
    set value(newValue: T);
    /**
     * Set the value without notifying observers.
     * @param newValue New value to set silently.
     */
    setSilent(newValue: T): void;
    /**
     * Subscribe to value changes.
     * If the same listener is already subscribed it will not be added twice.
     * @param listener Observer callback to invoke on changes.
     * @returns A function that unsubscribes the provided listener when called.
     */
    subscribe(listener: Observer<T>): () => void;
    /**
     * Unsubscribe a previously registered listener.
     * @param listener Listener to remove.
     */
    unsubscribe(listener: Observer<T>): void;
    /**
     * Notify all observers with the current value.
     */
    private _notify;
}
