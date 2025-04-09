import {Component} from '@wonderlandengine/api';

/**
 * Component that manages time related functions based on the game loop.
 */
export class TimerController extends Component {
    static TypeName = 'timer-controller';

    // Singleton
    private static _instance: TimerController;

    // The time in seconds since the first update.
    private _gameTime: number = 0;
    private _schedules: Map<number, {callback: () => void; trigger: number}> = new Map();
    private _scheduleId: number = 0;
    private _lastSyncSysClock: number = 0;
    private _tickLength: number = 0;
    private _ticksPerSecond: number = 20; // Default value

    public renderPartialTicks: number = 0;
    public elapsedPartialTicks: number = 0;

    static get instance(): TimerController {
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

    start() {}

    update(dt: number) {
        this._gameTime += dt;

        // Check for callbacks that need to be executed
        if (this._schedules.size > 0) {
            const toRemove: number[] = [];

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
    schedule(callback: () => void, delay: number): number {
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
    unschedule(id: number): boolean {
        return this._schedules.delete(id);
    }

    /**
     * Sets the number of ticks per second.
     */
    setTicksPerSecond(ticks: number): void {
        this._ticksPerSecond = ticks;
        this._tickLength = 1.0 / ticks;
    }

    /**
     * Calculates and returns the number of whole ticks that have elapsed.
     * Updates partial tick tracking for smooth animations.
     *
     * @returns Number of whole ticks that have elapsed
     */
    getPartialTicks(): number {
        this.elapsedPartialTicks =
            (this._gameTime - this._lastSyncSysClock) / this._tickLength;
        this._lastSyncSysClock = this._gameTime;
        this.renderPartialTicks += this.elapsedPartialTicks;
        const i = Math.floor(this.renderPartialTicks);
        this.renderPartialTicks -= i;
        return i;
    }
}
