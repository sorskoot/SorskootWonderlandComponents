export interface Observer<T> {
    update(value: T): void;
}

export class Observable<T> {
    private _observers: Set<Observer<T>> = new Set();
    private _value: T;

    get value(): T {
        return this.getValue();
    }

    set value(newValue: T) {
        this.setValue(newValue);
    }

    constructor(initialValue: T) {
        this._value = initialValue;
    }

    subscribe(observer: Observer<T>): () => void {
        this._observers.add(observer);
        observer.update(this._value);
        return () => this._observers.delete(observer);
    }

    getValue(): T {
        return this._value;
    }

    setValue(newValue: T): void {
        this._value = newValue;
        this.notify();
    }

    private notify(): void {
        this._observers.forEach((observer) => observer.update(this._value));
    }
}
