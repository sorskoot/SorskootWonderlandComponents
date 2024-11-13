import {Emitter} from '@wonderlandengine/api';

export class NotifyPropertyChanged {
    propertyChanged: Emitter<[string, any | undefined, any | undefined]> = new Emitter();

    notifyPropertyChanged(
        propertyName: string,
        newValue: any = undefined,
        oldValue: any = undefined
    ) {
        this.propertyChanged.notify(propertyName, newValue, oldValue);
    }
}
