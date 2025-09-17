import { Emitter } from '@wonderlandengine/api';
export declare class NotifyPropertyChanged {
    propertyChanged: Emitter<[string, any | undefined, any | undefined]>;
    notifyPropertyChanged(propertyName: string, newValue?: any, oldValue?: any): void;
}
