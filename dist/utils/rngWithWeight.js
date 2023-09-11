import { rng } from "./rng.js";
/**
 * Gets a random element from the given array with the given weights.
 * @param {[]} array array with elements
 * @param {[]} itemsWithWeights array of weights, should be as longs as the array
 * @returns
 */
export function rngWithWeight(array, itemsWithWeights) {
    // Calculate the total weight of all items.
    let totalWeight = itemsWithWeights.reduce((total, itemWithWeight) => {
        return total + itemWithWeight;
    }, 0);
    // Generate a random value between 0 and the total weight.
    let randomValue = rng.getUniformInt(0, totalWeight);
    // Iterate through items and subtract their weight from the random value.
    for (let i = 0; i < itemsWithWeights.length; i++) {
        randomValue -= itemsWithWeights[i];
        // When the value becomes negative or zero,
        // return the current element as it's now "selected".
        if (randomValue <= 0) {
            return array[i];
        }
    }
    // Return null if no elements found, though it should not happen in practice.
    return null;
}
