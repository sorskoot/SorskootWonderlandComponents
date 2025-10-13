export class EventChannel {
    constructor() {
        // Store handlers with optional context and once flag
        this._handlers = [];
    }
    /**
     * Number of registered listeners.
     */
    get listenerCount() {
        return this._handlers.length;
    }
    /**
     * Add a handler to the event.
     * Duplicate registrations of the same (fn + context) are ignored.
     * @param fn - The function to call when the event is dispatched.
     * @param context - Optional `this` context for the handler.
     */
    on(fn, context) {
        if (typeof fn !== 'function') {
            throw new Error('EventChannel.on: handler must be a function');
        }
        if (this.has(fn, context)) {
            // Prevent duplicate (fn + context) registrations.
            return;
        }
        this._handlers.push({ fn, context });
    }
    /**
     * Add a handler that will be called only once.
     * @param fn - The function to call once when the event is dispatched.
     * @param context - Optional `this` context for the handler.
     */
    once(fn, context) {
        if (typeof fn !== 'function') {
            throw new Error('EventChannel.once: handler must be a function');
        }
        if (this.has(fn, context)) {
            // If already registered (fn+context), don't add again.
            return;
        }
        this._handlers.push({ fn, context, once: true });
    }
    /**
     * Emits the event to all handlers in registration order.
     * If any handler returns `true`, propagation stops.
     * Handler exceptions are caught and logged, and won't stop other handlers.
     */
    emit(...args) {
        // Snapshot handlers to avoid issues with modifications during emit
        const handlers = this._handlers.slice();
        for (const h of handlers) {
            try {
                const result = h.fn.apply(h.context, args);
                if (h.once) {
                    // Remove the instance that matches fn+context
                    this.off(h.fn, h.context);
                }
                if (result === true) {
                    // Stop propagation if handler explicitly returned true
                    break;
                }
            }
            catch (err) {
                // Keep dispatching to other handlers even if one throws.
                // Use console.error here; consumer can replace with their logger.
                // Avoid exposing internal state in logs.
                // eslint-disable-next-line no-console
                console.error('EventChannel handler error:', err);
            }
        }
    }
    /**
     * Remove a handler. Returns true if a handler was removed.
     * If context is provided, the pair (fn + context) is matched.
     * If context is omitted, remove the first matching fn regardless of context.
     * This method is idempotent (no error if handler not found).
     */
    off(fn, context) {
        if (typeof fn !== 'function') {
            throw new Error('EventChannel.off: handler must be a function');
        }
        let index = -1;
        if (context === undefined) {
            index = this._handlers.findIndex((h) => h.fn === fn);
        }
        else {
            index = this._handlers.findIndex((h) => h.fn === fn && h.context === context);
        }
        if (index === -1) {
            return false;
        }
        this._handlers.splice(index, 1);
        return true;
    }
    /**
     * Check whether a given handler (optionally with context) is registered.
     */
    has(fn, context) {
        return this._handlers.some((h) => h.fn === fn && (context === undefined || h.context === context));
    }
    /**
     * Remove all handlers.
     */
    clear() {
        this._handlers.length = 0;
    }
    /**
     * Iterate registered handlers (read-only snapshot). Useful for debugging.
     */
    *[Symbol.iterator]() {
        for (const h of this._handlers.slice()) {
            yield h;
        }
    }
}
