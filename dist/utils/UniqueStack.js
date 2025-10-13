/**
 * A stack data structure that ensures all items are unique.
 * @template T The type of items stored in the stack.
 */
export class UniqueStack {
    constructor() {
        /**
         * Internal array to store unique items.
         */
        this._items = [];
    }
    /**
     * Pushes an item onto the stack if it is not already present.
     * @param item The item to push onto the stack.
     */
    push(item) {
        if (!this._items.includes(item)) {
            this._items.push(item);
        }
    }
    /**
     * Removes and returns the last item from the stack.
     * @returns The last item from the stack, or undefined if the stack is empty.
     */
    pop() {
        return this._items.pop();
    }
    /**
     * Gets a copy of the items in the stack.
     * @returns A copy of the stack's items.
     */
    get items() {
        return [...this._items]; // Return a copy to prevent external mutation
    }
    /**
     * Iterates over the stack's items in reverse order.
     * @returns An iterator for the stack's items in reverse order.
     */
    iterateBackwards() {
        return this._items.slice().reverse().values();
    }
    /**
     * Finds the first element from the end of the stack that fulfills a given condition.
     * @param predicate A function that takes an item and returns true if the condition is met.
     * @returns The first element that fulfills the condition, or undefined if none is found.
     */
    findFromEnd(predicate) {
        for (let i = this._items.length - 1; i >= 0; i--) {
            if (predicate(this._items[i])) {
                return this._items[i];
            }
        }
        return undefined;
    }
    /**
     * Returns the index of the specified item in the stack.
     * If the item is not found, it returns -1.
     *
     * @param item - The item to locate in the stack.
     * @returns The zero-based index of the item, or -1 if the item is not found.
     */
    indexOf(item) {
        return this._items.indexOf(item);
    }
}
