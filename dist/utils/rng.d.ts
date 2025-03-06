/**
 * This code is an implementation of Alea algorithm; (C) 2010 Johannes Baagøe.
 * Alea is licensed according to the http://en.wikipedia.org/wiki/MIT_License.
 */
export declare class RNG {
    _seed: number;
    _s0: number;
    _s1: number;
    _s2: number;
    _c: number;
    getSeed(): number;
    /**
     * Seed the number generator
     * @type {number} seed - Seed value
     */
    setSeed(seed: number): this;
    /**
     * @returns Pseudorandom value [0,1), uniformly distributed
     */
    getUniform(): number;
    /**
     * @param {number} lowerBound The lower end of the range to return a value from, inclusive
     * @param {number} upperBound The upper end of the range to return a value from, inclusive
     * @returns Pseudorandom value [lowerBound, upperBound], using ROT.RNG.getUniform() to distribute the value
     */
    getUniformInt(lowerBound: number, upperBound: number): number;
    /**
     * @param mean Mean value
     * @param stddev Standard deviation. ~95% of the absolute values will be lower than 2*stddev.
     * @returns A normally distributed pseudorandom value
     */
    getNormal(mean?: number, stddev?: number): number;
    /**
     * @returns Pseudorandom value [1,100] inclusive, uniformly distributed
     */
    getPercentage(): number;
    /**
     * @param {Array} array Array to pick a random item from
     * @returns Randomly picked item, null when length=0
     */
    getItem(array: Array<any>): any;
    /**
     * Gets random unique items from an array
     * @param array the array to get items from
     * @param amount the amount of items to get
     * @returns the random item; null if the array is empty
     */
    getItems<T>(array: T[], amount: number): T[];
    /**
     * @param {Array} array Array to randomize
     * @returns New array with randomized items
     */
    shuffle(array: Array<any>): any[];
    /**
     * @param {Object} data key = whatever, value=weight (relative probability)
     * @returns whatever
     */
    getWeightedValue(data: any): string | undefined;
    /**
     * Get RNG state. Useful for storing the state and re-setting it via setState.
     * @returns Internal state
     */
    getState(): number[];
    randomNonRepeatingValues(min: number, max: number, valueCount: number): number[];
    shuffleArray<T>(array: T[]): void;
    /**
     * Set a previously retrieved state.
     */
    setState(state: number[]): this;
    /**
     * Returns a cloned RNG
     */
    clone(): RNG;
}
export declare const rng: RNG;
