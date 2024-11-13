import { Coroutine } from './Coroutine.js';
/**
 * Class to be used with the CoroutineManager. It mimics the coroutine behavior in Unity.
 *
 * @example:
 * Create Coroutine object with a generator function. The generator function could yield a number to wait for that amount of time.
 * ```typescript
 * const coroutine = new Coroutine(function* () {
 *    console.log('Hello');
 *    yield new WaitForSeconds(1); // Wait for 1 second.
 *    console.log('World');
 * });
 * ```
 * In a component, add the coroutine to the CoroutineManager.
 * ```typescript
 * const coroutineManager = new CoroutineManager();
 * const id = coroutineManager.addCoroutine(coroutine);
 * ```
 * And call it in the update loop.
 * ```typescript
 * update(deltaTime: number) {
 *    this.coroutineManager.update(deltaTime);
 * }
 *
 * To remove the coroutine, call stopCoroutine with the id.
 * ```typescript
 * this.coroutineManager.stopCoroutine(id);
 * ```
 */
export declare class CoroutineManager {
    private coroutines;
    private nextId;
    addCoroutine(coroutine: Coroutine): number;
    stopCoroutine(id: number): void;
    update(deltaTime: number): void;
}
