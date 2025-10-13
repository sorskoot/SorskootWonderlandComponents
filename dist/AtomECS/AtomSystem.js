/**
 * Abstract base class for all systems in the AtomECS.
 * Systems contain logic that operates on entities with specific components.
 *
 * @example
 * ```typescript
 * class MovementSystem extends AtomSystem {
 *     constructor() {
 *         super('movement', 1); // Name and priority
 *     }
 *
 *     update(delta: number): void {
 *         for (const entity of this.allEntities) {
 *             const position = entity.getComponent(PositionComponent);
 *             const velocity = entity.getComponent(VelocityComponent);
 *
 *             if (position && velocity) {
 *                 position.x += velocity.x * delta;
 *                 position.y += velocity.y * delta;
 *             }
 *         }
 *     }
 * }
 * ```
 */
export class AtomSystem {
    /**
     * Creates a new system
     *
     */
    constructor(name) {
        /**
         * The name of the system
         * @private
         */
        this._name = 'System';
        /**
         * Array of entities the system operates on
         * @protected
         */
        this.allEntities = [];
        this._name = name;
    }
    /**
     * Gets the name of the system
     *
     * @returns {string} The system name
     */
    get name() {
        return this._name;
    }
}
