export class Observable {
    _observers = new Set();
    _value;
    get value() {
        return this.getValue();
    }
    set value(newValue) {
        this.setValue(newValue);
    }
    constructor(initialValue) {
        this._value = initialValue;
    }
    subscribe(observer) {
        this._observers.add(observer);
        observer.update(this._value);
        return () => this._observers.delete(observer);
    }
    getValue() {
        return this._value;
    }
    setValue(newValue) {
        this._value = newValue;
        this.notify();
    }
    notify() {
        this._observers.forEach((observer) => observer.update(this._value));
    }
}
