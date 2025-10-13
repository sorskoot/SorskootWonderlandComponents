import {AtomComponent} from './AtomComponent.js';

/**
 * Represents an entity in the AtomECS system.
 * Entities are containers for components that define their behavior and data.
 *
 * @example
 * ```typescript
 * // Create a new entity
 * const player = new AtomEntity();
 *
 * // Add components to the entity
 * player.addComponent(new PositionComponent(10, 20));
 * player.addComponent(new RenderComponent('player.png'));
 *
 * // Get a specific component
 * const position = player.getComponent(PositionComponent);
 * if (position) {
 *     position.x += 5;
 * }
 * ```
 */
export class AtomEntity {
    /**
     * Map of components by their ID
     * @private
     */
    private _components: {[id: string]: AtomComponent} = {};

    /**
     * Adds a component to the entity
     *
     * @param {AtomComponent} componentInstance - The component instance to add
     * @throws {Error} If a component with the same ID already exists on this entity
     *
     * @example
     * ```typescript
     * entity.addComponent(new PositionComponent(0, 0));
     * ```
     */
    addComponent(componentInstance: AtomComponent) {
        const componentId = componentInstance.id;
        if (this._components[componentId]) {
            throw new Error(`Component with id ${componentId} already exists`);
        }
        this._components[componentId] = componentInstance;
    }

    /**
     * Retrieves the first component of the specified type
     *
     * @template T - The component type to retrieve
     * @param {new (...args: any[]) => T} componentType - The constructor of the component type
     * @returns {T | undefined} The component instance if found, otherwise undefined
     *
     * @example
     * ```typescript
     * const position = entity.getComponent(PositionComponent);
     * if (position) {
     *     console.log(`Position: ${position.x}, ${position.y}`);
     * }
     * ```
     */
    getComponent<T extends AtomComponent>(componentType: {
        new (...args: any[]): T;
    }): T | undefined {
        for (const key in this._components) {
            if (this._components[key] instanceof componentType) {
                return this._components[key] as T;
            }
        }
        return undefined;
    }

    /**
     * Retrieves all components of the specified type
     *
     * @template T - The component type to retrieve
     * @param {new (...args: any[]) => T} componentType - The constructor of the component type
     * @returns {T[]} An array of matching component instances
     *
     * @example
     * ```typescript
     * const weapons = entity.getComponents(WeaponComponent);
     * weapons.forEach(weapon => {
     *     console.log(`Weapon: ${weapon.name}, Damage: ${weapon.damage}`);
     * });
     * ```
     */
    getComponents<T extends AtomComponent>(componentType: {new (...args: any[]): T}): T[] {
        const results: T[] = [];
        for (const key in this._components) {
            if (this._components[key] instanceof componentType) {
                results.push(this._components[key] as T);
            }
        }
        return results;
    }

    /**
     * Checks if the entity has at least one component of the specified type
     * @template T - The component type to check
     * @param {new (...args: any[]) => T} componentType - The constructor of the component type
     * @returns {boolean} True if the entity has at least one component of the specified type, otherwise false
     */
    hasComponent<T extends AtomComponent>(componentType: {
        new (...args: any[]): T;
    }): boolean {
        return !!this.getComponent(componentType);
    }
}
