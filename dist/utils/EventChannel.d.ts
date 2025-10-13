type EventHandler<T extends unknown[]> = (...args: T) => boolean | void;
export declare class EventChannel<T extends unknown[] = []> {
    private _handlers;
    /**
     * Number of registered listeners.
     */
    get listenerCount(): number;
    /**
     * Add a handler to the event.
     * Duplicate registrations of the same (fn + context) are ignored.
     * @param fn - The function to call when the event is dispatched.
     * @param context - Optional `this` context for the handler.
     */
    on(fn: EventHandler<T>, context?: unknown): void;
    /**
     * Add a handler that will be called only once.
     * @param fn - The function to call once when the event is dispatched.
     * @param context - Optional `this` context for the handler.
     */
    once(fn: EventHandler<T>, context?: unknown): void;
    /**
     * Emits the event to all handlers in registration order.
     * If any handler returns `true`, propagation stops.
     * Handler exceptions are caught and logged, and won't stop other handlers.
     */
    emit(...args: T): void;
    /**
     * Remove a handler. Returns true if a handler was removed.
     * If context is provided, the pair (fn + context) is matched.
     * If context is omitted, remove the first matching fn regardless of context.
     * This method is idempotent (no error if handler not found).
     */
    off(fn: EventHandler<T>, context?: unknown): boolean;
    /**
     * Check whether a given handler (optionally with context) is registered.
     */
    has(fn: EventHandler<T>, context?: unknown): boolean;
    /**
     * Remove all handlers.
     */
    clear(): void;
    /**
     * Iterate registered handlers (read-only snapshot). Useful for debugging.
     */
    [Symbol.iterator](): IterableIterator<{
        fn: EventHandler<T>;
        context?: unknown;
        once?: boolean;
    }>;
}
export {};
