import { Emitter } from '@wonderlandengine/api';
/**
 * OfflineHelper is a singleton class that helps in managing and detecting
 * the online/offline status of the application.
 */
export declare class OfflineHelper {
    private static _instance;
    wentOnline: Emitter<[]>;
    wentOffline: Emitter<[]>;
    /**
     * Returns the single instance of the OfflineHelper.
     * If the instance does not exist, it creates a new one.
     */
    static get instance(): OfflineHelper;
    private constructor();
    /**
     * Returns true if the application is offline, false otherwise.
     */
    get isOffline(): boolean;
    private _online;
    private _offline;
}
