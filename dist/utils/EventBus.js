/**
 * Utilities for lightweight event messaging used across components.
 *
 * Notes:
 *  - This file is part of the Sorskoot Wonderland Components library.
 *  - Relative imports in this project require explicit .js extensions.
 *  - Designed to be small and dependency-free (except for the local EventChannel).
 *
 * Public APIs:
 *  - TypedEventBus<Events>: simple strongly-typed publish/subscribe for single-argument events.
 *  - EventBus<EventMap>: channel-based emitter that supports multiple-argument events,
 *    once/on/off semantics and clearing channels.
 */
import { EventChannel } from './EventChannel.js';
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
export class TypedEventBus {
    constructor() {
        this.listeners = {};
    }
    subscribe(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }
    publish(event, payload) {
        var _a;
        (_a = this.listeners[event]) === null || _a === void 0 ? void 0 : _a.forEach((cb) => {
            cb(payload);
        });
    }
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
export class EventBus {
    constructor() {
        this._channels = new Map();
    }
    /**
     * Get or create a channel for the event name.
     */
    _get(name) {
        let ch = this._channels.get(name);
        if (!ch) {
            ch = new EventChannel();
            this._channels.set(name, ch);
        }
        return ch;
    }
    on(name, fn, context) {
        this._get(name).on(fn, context);
    }
    once(name, fn, context) {
        this._get(name).once(fn, context);
    }
    off(name, fn, context) {
        return this._get(name).off(fn, context);
    }
    emit(name, ...args) {
        this._get(name).emit(...args);
    }
    clearEvent(name) {
        const ch = this._channels.get(name);
        if (ch) {
            ch.clear();
        }
    }
    clearAll() {
        for (const ch of this._channels.values()) {
            ch.clear();
        }
        this._channels.clear();
    }
}
