import { AtomEntity } from './AtomEntity.js';
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
export declare abstract class AtomSystem {
    /**
     * The name of the system
     * @private
     */
    private _name;
    /**
     * Array of entities the system operates on
     * @protected
     */
    protected allEntities: AtomEntity[];
    /**
     * Creates a new system
     *
     */
    constructor(name: string);
    /**
     * Gets the name of the system
     *
     * @returns {string} The system name
     */
    get name(): string;
    /**
     * Updates the system for the current frame
     * This method must be implemented by derived systems to define their behavior.
     *
     * @param {number} delta - The time elapsed since the last update (in seconds)
     */
    abstract update(delta: number): void;
}
