/**
 * Simple observable container that notifies subscribed observers when
 * its value changes.
 */
export class Observable {
    /**
     * Create a new Observable.
     * @param initialValue Optional initial value for the observable.
     */
    constructor(initialValue) {
        this._observers = [];
        if (initialValue !== undefined) {
            this._value = initialValue;
        }
    }
    /**
     * Current value of the observable.
     */
    get value() {
        return this._value;
    }
    /**
     * Set the value and notify all observers.
     * @param newValue New value to set.
     */
    set value(newValue) {
        this._value = newValue;
        this._notify();
    }
    /**
     * Set the value without notifying observers.
     * @param newValue New value to set silently.
     */
    setSilent(newValue) {
        this._value = newValue;
    }
    /**
     * Subscribe to value changes.
     * If the same listener is already subscribed it will not be added twice.
     * @param listener Observer callback to invoke on changes.
     * @returns A function that unsubscribes the provided listener when called.
     */
    subscribe(listener) {
        if (!this._observers.includes(listener)) {
            this._observers.push(listener);
        }
        return () => {
            this.unsubscribe(listener);
        };
    }
    /**
     * Unsubscribe a previously registered listener.
     * @param listener Listener to remove.
     */
    unsubscribe(listener) {
        this._observers = this._observers.filter((observer) => observer !== listener);
    }
    /**
     * Notify all observers with the current value.
     */
    _notify() {
        for (const observer of this._observers) {
            observer(this._value);
        }
    }
}
