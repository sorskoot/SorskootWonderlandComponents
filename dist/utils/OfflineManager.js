import { Emitter } from '@wonderlandengine/api';
/**
 * OfflineHelper is a singleton class that helps in managing and detecting
 * the online/offline status of the application.
 */
export class OfflineHelper {
    // Private static instance of OfflineHelper
    static _instance;
    // Emitters to notify when the application goes online or offline
    wentOnline = new Emitter();
    wentOffline = new Emitter();
    /**
     * Returns the single instance of the OfflineHelper.
     * If the instance does not exist, it creates a new one.
     */
    static get instance() {
        if (!OfflineHelper._instance) {
            OfflineHelper._instance = new OfflineHelper();
        }
        return OfflineHelper._instance;
    }
    // Private constructor to prevent direct instantiation
    constructor() {
        // Add event listeners for online and offline events
        window.addEventListener('online', this._online);
        window.addEventListener('offline', this._offline);
    }
    /**
     * Returns true if the application is offline, false otherwise.
     */
    get isOffline() {
        return !navigator.onLine;
    }
    // Private method to handle the online event
    _online = () => {
        this.wentOnline.notify();
    };
    // Private method to handle the offline event
    _offline = () => {
        this.wentOffline.notify();
    };
}
