/**
 * Waits for a number of seconds to pass before continuing.
 * @param seconds the number of seconds to wait
 */
export function* waitForSeconds(seconds) {
    let elapsedTime = 0;
    while (elapsedTime < seconds) {
        const deltaTime = yield;
        elapsedTime += deltaTime;
    }
}
/**
 * Waits for a condition to be true before continuing.
 * @param conditionFn the function to check if the condition is true
 */
export function* waitForCondition(conditionFn) {
    while (!conditionFn()) {
        yield;
    }
}
