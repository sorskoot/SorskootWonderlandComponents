import { rng } from "./rng.js";
/**
 * Shuffles array in place. ES6 version
 * @param {[]} arr array to shuffle
 */
export function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = rng.getUniformInt(0, i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
