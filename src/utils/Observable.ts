export type Observer<T> = (data: T) => void;

/**
 * Simple observable container that notifies subscribed observers when
 * its value changes.
 */
export class Observable<T> {
    private _observers: Observer<T>[] = [];
    private _value!: T;

    /**
     * Create a new Observable.
     * @param initialValue Optional initial value for the observable.
     */
    constructor(initialValue?: T) {
        if (initialValue !== undefined) {
            this._value = initialValue;
        }
    }

    /**
     * Current value of the observable.
     */
    public get value(): T {
        return this._value;
    }

    /**
     * Set the value and notify all observers.
     * @param newValue New value to set.
     */
    public set value(newValue: T) {
        this._value = newValue;
        this._notify();
    }

    /**
     * Set the value without notifying observers.
     * @param newValue New value to set silently.
     */
    public setSilent(newValue: T): void {
        this._value = newValue;
    }

    /**
     * Subscribe to value changes.
     * If the same listener is already subscribed it will not be added twice.
     * @param listener Observer callback to invoke on changes.
     * @returns A function that unsubscribes the provided listener when called.
     */
    public subscribe(listener: Observer<T>): () => void {
        if (!this._observers.includes(listener)) {
            this._observers.push(listener);
        }

        return (): void => {
            this.unsubscribe(listener);
        };
    }

    /**
     * Unsubscribe a previously registered listener.
     * @param listener Listener to remove.
     */
    public unsubscribe(listener: Observer<T>): void {
        this._observers = this._observers.filter((observer) => observer !== listener);
    }

    /**
     * Notify all observers with the current value.
     */
    private _notify(): void {
        for (const observer of this._observers) {
            observer(this._value);
        }
    }
}
