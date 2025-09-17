import {AtomEntity} from './AtomEntity.js';

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
export abstract class AtomSystem {
    /**
     * The name of the system
     * @private
     */
    private _name: string = 'System';

    /**
     * Array of entities the system operates on
     * @protected
     */
    protected allEntities: AtomEntity[] = [];

    /**
     * Creates a new system
     *
     * @param {string} name - The name of the system
     * @param {number} priority - The priority of the system (determines execution order)
     */
    constructor(name: string, priority: number) {
        this._name = name;
    }

    /**
     * Gets the name of the system
     *
     * @returns {string} The system name
     */
    get name(): string {
        return this._name;
    }

    /**
     * Updates the system for the current frame
     * This method must be implemented by derived systems to define their behavior.
     *
     * @param {number} delta - The time elapsed since the last update (in seconds)
     */
    abstract update(delta: number): void;
}
