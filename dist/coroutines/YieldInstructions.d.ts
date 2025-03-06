/**
 * Waits for a number of seconds to pass before continuing.
 * @param seconds the number of seconds to wait
 */
export declare function waitForSeconds(seconds: number): Generator<undefined, void, number>;
/**
 * Waits for a condition to be true before continuing.
 * @param conditionFn the function to check if the condition is true
 */
export declare function waitForCondition(conditionFn: () => boolean): Generator<undefined, void, unknown>;
/**
 * Waits for a promise to resolve before continuing.
 * @param promise the promise to wait for
 */
export declare function waitForPromise<T>(promise: Promise<T>): Generator<undefined, T | undefined, unknown>;
