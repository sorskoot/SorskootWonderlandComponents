import { Component } from '@wonderlandengine/api';
/**
 * Component that manages time related functions based on the game loop.
 */
export class TimerController extends Component {
    constructor() {
        super(...arguments);
        // The time in seconds since the first update.
        this._gameTime = 0;
        this._schedules = new Map();
        this._scheduleId = 0;
        this._lastSyncSysClock = 0;
        this._tickLength = 0;
        this._ticksPerSecond = 20; // Default value
        this.renderPartialTicks = 0;
        this.elapsedPartialTicks = 0;
    }
    static get instance() {
        return TimerController._instance;
    }
    init() {
        if (TimerController._instance) {
            console.error('There can only be one instance of TimerController Component');
        }
        TimerController._instance = this;
        this._tickLength = 1.0 / this._ticksPerSecond;
        this._lastSyncSysClock = this._gameTime;
    }
    start() { }
    update(dt) {
        this._gameTime += dt;
        // Check for callbacks that need to be executed
        if (this._schedules.size > 0) {
            const toRemove = [];
            // Check all scheduled callbacks
            this._schedules.forEach((schedule, id) => {
                if (this._gameTime >= schedule.trigger) {
                    // Execute the callback
                    schedule.callback();
                    // Mark for removal
                    toRemove.push(id);
                }
            });
            // Remove executed callbacks
            toRemove.forEach((id) => {
                this._schedules.delete(id);
            });
        }
    }
    /**
     * Schedules a callback to be called after a delay.
     */
    schedule(callback, delay) {
        const id = this._scheduleId++;
        this._schedules.set(id, {
            callback: callback,
            trigger: this._gameTime + delay,
        });
        return id;
    }
    /**
     * Unschedules a callback by its id.
     */
    unschedule(id) {
        return this._schedules.delete(id);
    }
    /**
     * Sets the number of ticks per second.
     */
    setTicksPerSecond(ticks) {
        this._ticksPerSecond = ticks;
        this._tickLength = 1.0 / ticks;
    }
    /**
     * Calculates and returns the number of whole ticks that have elapsed.
     * Updates partial tick tracking for smooth animations.
     *
     * @returns Number of whole ticks that have elapsed
     */
    getPartialTicks() {
        this.elapsedPartialTicks =
            (this._gameTime - this._lastSyncSysClock) / this._tickLength;
        this._lastSyncSysClock = this._gameTime;
        this.renderPartialTicks += this.elapsedPartialTicks;
        const i = Math.floor(this.renderPartialTicks);
        this.renderPartialTicks -= i;
        return i;
    }
}
TimerController.TypeName = 'timer-controller';
