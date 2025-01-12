import { vec3 } from 'gl-matrix';
export const AxisX = vec3.fromValues(1, 0, 0);
export const AxisY = vec3.fromValues(0, 1, 0);
export const AxisZ = vec3.fromValues(0, 0, 1);
export const AxisNegZ = vec3.fromValues(0, 0, -1);
export const Vec3Zero = vec3.fromValues(0, 0, 0);
export const Vec3One = vec3.fromValues(1, 1, 1);
/**
 * Used for converting radians to degrees
 * @example
 * const deg = rad * Rad2Deg;
 */
const Rad2Deg = 57.29577951;
/**
 * Used for converting degrees to radians
 * @example
 * const rad = deg * Deg2Rad;
 */
const Deg2Rad = 0.017453292;
/**
 * Loops the value t, so that it is never larger than length and never smaller than 0.
 */
function repeat(t, length) {
    return clamp(t - Math.floor(t / length) * length, 0.0, length);
}
function fract(value) {
    // we simply subtract the integer part of the value to get the fractional part
    // The 0 bitshift is slighty faster than Math.floor
    return value - (value << 0);
}
/**
 * Clamps input value to provided minimum & maximum range
 * @param value Numeric input for clamping operation
 * @param min Minimum allowed result after clamping )
 * @param max Maximum allowed result after clamping
 * @return Resulting output within specified constraint range [min,max]
 */
export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
/**
 * Compares two floating point values and returns true if they are similar.
 * @returns true if the floating point values a and b are similar.
 */
function approximately(a, b) {
    return (Math.abs(b - a) <
        Math.max(1e-6 * Math.max(Math.abs(a), Math.abs(b)), Number.EPSILON * 8));
}
export const Mathf = {
    Rad2Deg,
    Deg2Rad,
    repeat,
    clamp,
    approximately,
    fract,
};
