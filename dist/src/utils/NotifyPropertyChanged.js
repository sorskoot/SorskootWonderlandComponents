import { Emitter } from '@wonderlandengine/api';
export class NotifyPropertyChanged {
    propertyChanged = new Emitter();
    notifyPropertyChanged(propertyName, newValue = undefined, oldValue = undefined) {
        this.propertyChanged.notify(propertyName, newValue, oldValue);
    }
}
