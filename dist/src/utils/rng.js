/**
 * This code is an implementation of Alea algorithm; (C) 2010 Johannes Baagøe.
 * Alea is licensed according to the http://en.wikipedia.org/wiki/MIT_License.
 */
const FRAC = 2.3283064365386963e-10; /* 2^-32 */
export class RNG {
    _seed = 0;
    _s0 = 0;
    _s1 = 0;
    _s2 = 0;
    _c = 0;
    getSeed() {
        return this._seed;
    }
    /**
     * Seed the number generator
     * @type {number} seed - Seed value
     */
    setSeed(seed) {
        seed = seed < 1 ? 1 / seed : seed;
        this._seed = seed;
        this._s0 = (seed >>> 0) * FRAC;
        seed = (seed * 69069 + 1) >>> 0;
        this._s1 = seed * FRAC;
        seed = (seed * 69069 + 1) >>> 0;
        this._s2 = seed * FRAC;
        this._c = 1;
        return this;
    }
    /**
     * @returns Pseudorandom value [0,1), uniformly distributed
     */
    getUniform() {
        let t = 2091639 * this._s0 + this._c * FRAC;
        this._s0 = this._s1;
        this._s1 = this._s2;
        this._c = t | 0;
        this._s2 = t - this._c;
        return this._s2;
    }
    /**
     * @param {number} lowerBound The lower end of the range to return a value from, inclusive
     * @param {number} upperBound The upper end of the range to return a value from, inclusive
     * @returns Pseudorandom value [lowerBound, upperBound], using ROT.RNG.getUniform() to distribute the value
     */
    getUniformInt(lowerBound, upperBound) {
        let max = Math.max(lowerBound, upperBound);
        let min = Math.min(lowerBound, upperBound);
        return Math.floor(this.getUniform() * (max - min + 1)) + min;
    }
    /**
     * @param mean Mean value
     * @param stddev Standard deviation. ~95% of the absolute values will be lower than 2*stddev.
     * @returns A normally distributed pseudorandom value
     */
    getNormal(mean = 0, stddev = 1) {
        let u, v, r;
        do {
            u = 2 * this.getUniform() - 1;
            v = 2 * this.getUniform() - 1;
            r = u * u + v * v;
        } while (r > 1 || r == 0);
        let gauss = u * Math.sqrt((-2 * Math.log(r)) / r);
        return mean + gauss * stddev;
    }
    /**
     * @returns Pseudorandom value [1,100] inclusive, uniformly distributed
     */
    getPercentage() {
        return 1 + Math.floor(this.getUniform() * 100);
    }
    /**
     * @param {Array} array Array to pick a random item from
     * @returns Randomly picked item, null when length=0
     */
    getItem(array) {
        if (!array.length) {
            return null;
        }
        return array[Math.floor(this.getUniform() * array.length)];
    }
    /**
     * Gets random unique items from an array
     * @param array the array to get items from
     * @param amount the amount of items to get
     * @returns the random item; null if the array is empty
     */
    getItems(array, amount) {
        if (!array.length) {
            return [];
        }
        if (amount > array.length) {
            amount = array.length;
        }
        const result = new Set();
        while (result.size < amount) {
            result.add(array[Math.floor(this.getUniform() * array.length)]);
        }
        return Array.from(result);
    }
    /**
     * @param {Array} array Array to randomize
     * @returns New array with randomized items
     */
    shuffle(array) {
        let result = [];
        let clone = array.slice();
        while (clone.length) {
            let index = clone.indexOf(this.getItem(clone));
            result.push(clone.splice(index, 1)[0]);
        }
        return result;
    }
    /**
     * @param {Object} data key = whatever, value=weight (relative probability)
     * @returns whatever
     */
    getWeightedValue(data) {
        let total = 0;
        for (let id in data) {
            total += data[id];
        }
        let random = this.getUniform() * total;
        let id, part = 0;
        for (id in data) {
            part += data[id];
            if (random < part) {
                return id;
            }
        }
        // If by some floating-point annoyance we have
        // random >= total, just return the last id.
        return id;
    }
    /**
     * Get RNG state. Useful for storing the state and re-setting it via setState.
     * @returns Internal state
     */
    getState() {
        return [this._s0, this._s1, this._s2, this._c];
    }
    randomNonRepeatingValues(min, max, valueCount) {
        const count = max - min;
        const values = new Array(count);
        for (let x = 0; x < count; x++) {
            values[x] = x + min;
        }
        this.shuffleArray(values);
        let results = [];
        for (let x = 0; x < valueCount && x < values.length; x++) {
            results.push(values[x]);
        }
        return results;
    }
    shuffleArray(array) {
        // shuffle array
        for (let x = array.length - 1; x >= 0; x--) {
            let index = this.getUniformInt(0, x); // Second argument is inclusive
            const temp = array[x];
            array[x] = array[index];
            array[index] = temp;
        }
    }
    /**
     * Set a previously retrieved state.
     */
    setState(state) {
        this._s0 = state[0];
        this._s1 = state[1];
        this._s2 = state[2];
        this._c = state[3];
        return this;
    }
    /**
     * Returns a cloned RNG
     */
    clone() {
        let clone = new RNG();
        return clone.setState(this.getState());
    }
}
export const rng = new RNG().setSeed(Date.now());
