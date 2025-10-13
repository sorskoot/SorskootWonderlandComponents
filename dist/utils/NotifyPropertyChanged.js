import { Emitter } from '@wonderlandengine/api';
export class NotifyPropertyChanged {
    constructor() {
        this.propertyChanged = new Emitter();
    }
    notifyPropertyChanged(propertyName, newValue = undefined, oldValue = undefined) {
        this.propertyChanged.notify(propertyName, newValue, oldValue);
    }
}
