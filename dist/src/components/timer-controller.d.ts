import { Component } from '@wonderlandengine/api';
/**
 * Component that manages time related functions based on the game loop.
 */
export declare class TimerController extends Component {
    static TypeName: string;
    private static _instance;
    private _gameTime;
    private _schedules;
    private _scheduleId;
    private _lastSyncSysClock;
    private _tickLength;
    private _ticksPerSecond;
    renderPartialTicks: number;
    elapsedPartialTicks: number;
    static get instance(): TimerController;
    init(): void;
    start(): void;
    update(dt: number): void;
    /**
     * Schedules a callback to be called after a delay.
     */
    schedule(callback: () => void, delay: number): number;
    /**
     * Unschedules a callback by its id.
     */
    unschedule(id: number): boolean;
    /**
     * Sets the number of ticks per second.
     */
    setTicksPerSecond(ticks: number): void;
    /**
     * Calculates and returns the number of whole ticks that have elapsed.
     * Updates partial tick tracking for smooth animations.
     *
     * @returns Number of whole ticks that have elapsed
     */
    getPartialTicks(): number;
}
