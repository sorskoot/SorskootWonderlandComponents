/**
 * A callback that is invoked when an event is published.
 *
 * @template T The payload type delivered to the callback. Use `void` when no payload is
 *             expected.
 *
 * @example
 * ```ts
 * // event without payload
 * type Events = { ready: void };
 * const cb: EventCallback<void> = () => { console.log('ready'); };
 *
 * // event with payload
 * type Payload = { id: string; value: number };
 * const cb2: EventCallback<Payload> = ({ id, value }) => { console.log(id, value); };
 * ```
 */
export type EventCallback<T> = (payload: T) => void;
/**
 * A strongly-typed event bus for decoupled communication between components.
 *
 * - Supports simple publish/subscribe patterns where each event has a single payload
 *   value (which can be `void`).
 * - Useful for small, local message passing where full channel semantics are unnecessary.
 *
 * @template Events A map of event names to payload types.
 *
 * @example
 * ```ts
 * type EventMap = {
 *     gameStart: void;
 *     playerScored: { playerId: string; points: number };
 * };
 *
 * const bus = new TypedEventBus<EventMap>();
 *
 * // Subscribe to a payload event
 * bus.subscribe('playerScored', ({ playerId, points }) => {
 *     console.log(`${playerId} scored ${points} points`);
 * });
 *
 * // Publish with payload
 * bus.publish('playerScored', { playerId: 'Hal', points: 42 });
 *
 * // Subscribe to a void event
 * bus.subscribe('gameStart', () => {
 *     console.log('game started');
 * });
 *
 * // Publish void
 * bus.publish('gameStart', undefined);
 * ```
 */
export declare class TypedEventBus<Events extends Record<string, any>> {
    private listeners;
    subscribe<K extends keyof Events>(event: K, callback: EventCallback<Events[K]>): void;
    publish<K extends keyof Events>(event: K, payload: Events[K]): void;
}
/**
 * A flexible event bus with named channels.
 *
 * - Each key in EventMap represents an event name. The associated value type is an
 *   array describing the argument types emitted for that event.
 * - Provides on / once / off semantics and allows clearing individual channels or all
 *   channels at once.
 *
 * @template EventMap A map where each property is an array type describing the
 *                     arguments for that event. Example: { opened: [string, number] }
 *
 * @example
 * ```ts
 * type Map = {
 *     opened: [string];                 // single string argument
 *     progress: [number, number];       // two numeric args
 *     closed: [];                       // no arguments
 * };
 *
 * const bus = new EventBus<Map>();
 *
 * // listen for opened
 * bus.on('opened', (name) => {
 *     console.log('opened', name);
 * });
 *
 * // emit opened
 * bus.emit('opened', 'inventory');
 *
 * // listen once
 * bus.once('progress', (current, max) => {
 *     console.log(current, max);
 * });
 *
 * // remove handler
 * const handler = (n: number) => { console.log(n); };
 * bus.on('progress', handler);
 * bus.off('progress', handler);
 *
 * // clear a single event channel
 * bus.clearEvent('opened');
 *
 * // clear everything
 * bus.clearAll();
 * ```
 */
export declare class EventBus<EventMap extends Record<string, unknown[]>> {
    private _channels;
    /**
     * Get or create a channel for the event name.
     */
    private _get;
    on<E extends keyof EventMap>(name: E, fn: (...args: EventMap[E]) => boolean | void, context?: unknown): void;
    once<E extends keyof EventMap>(name: E, fn: (...args: EventMap[E]) => boolean | void, context?: unknown): void;
    off<E extends keyof EventMap>(name: E, fn: (...args: EventMap[E]) => boolean | void, context?: unknown): boolean;
    emit<E extends keyof EventMap>(name: E, ...args: EventMap[E]): void;
    clearEvent<E extends keyof EventMap>(name: E): void;
    clearAll(): void;
}
