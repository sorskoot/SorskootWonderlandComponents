/**
 * Abstract base class for all components in the AtomECS system.
 * Components represent isolated pieces of functionality or data that can be attached to entities.
 *
 * @example
 * ```typescript
 * // Define a custom component by extending AtomComponent
 * class PositionComponent extends AtomComponent {
 *     private _x: number = 0;
 *     private _y: number = 0;
 *
 *     constructor(x: number = 0, y: number = 0) {
 *         super();
 *         this._x = x;
 *         this._y = y;
 *     }
 *
 *     get id(): string {
 *         return 'position';
 *     }
 *
 *     get x(): number { return this._x; }
 *     set x(value: number) { this._x = value; }
 *
 *     get y(): number { return this._y; }
 *     set y(value: number) { this._y = value; }
 * }
 * ```
 */
export abstract class AtomComponent {
    /**
     * Returns the component's unique identifier
     * Each component type should have a unique ID to identify it in the system.
     *
     * @returns {string} The unique identifier for this component type
     */
    abstract get id(): string;
}
