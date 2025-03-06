export interface Observer<T> {
    update(value: T): void;
}
export declare class Observable<T> {
    private _observers;
    private _value;
    get value(): T;
    set value(newValue: T);
    constructor(initialValue: T);
    subscribe(observer: Observer<T>): () => void;
    getValue(): T;
    setValue(newValue: T): void;
    private notify;
}
