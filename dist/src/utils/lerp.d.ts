import { NumberArray } from '@wonderlandengine/api';
import { vec3 } from 'gl-matrix';
export declare const Easing: {
    /**
     * Linear easing function.
     * @param t A value between 0 and 1 representing the progress of the animation.
     * @returns The same value as `t`, providing a linear progression.
     */
    Linear: (t: number) => number;
    /**
     * Quadratic ease-in function.
     * @param t A value between 0 and 1 representing the progress of the animation.
     * @returns A value representing an accelerated (quadratic) progression from 0 to 1.
     */
    InQuad: (t: number) => number;
    /**
     * Quadratic ease-out function.
     * @param t A value between 0 and 1 representing the progress of the animation.
     * @returns A value representing a decelerated (quadratic) progression from 0 to 1.
     */
    OutQuad: (t: number) => number;
    /**
     * Quadratic ease-in-out function.
     * @param t A value between 0 and 1 representing the progress of the animation.
     * @returns A value that accelerates in, then decelerates out, providing a smooth transition between motion states.
     */
    InOutQuad: (t: number) => number;
    /**
     * Cubic ease-in function.
     * @param t A value between 0 and 1 representing the progress of the animation.
     * @returns A value representing an accelerated (cubic) progression from 0 to 1.
     */
    InCubic: (t: number) => number;
    /**
     * Cubic ease-out function.
     * @param t A value between 0 and 1 representing the progress of the animation.
     * @returns A value representing an decelerated (cubic) progression from 0 to 1.
     */
    OutCubic: (t: number) => number;
    /**
     * Cubic ease-in-out function.
     * @param t A value between 0 and 1 representing the progress of the animation.
     * @returns A value that accelerates in, then decelerates out, providing a smooth transition between motion states.
     */
    InOutCubic: (t: number) => number;
    /**
     * Hermite easing function.
     * @param t A value between 0 and 1 representing the progress of the animation.
     * @returns A value that is a smooth, S-shaped curve that smoothly interpolates between 0 and 1.
     */
    Hermite: (t: number) => number;
    /**
     * Custom bezier curve type function.
     * @param t A value between 0 and 1 representing the progress of the animation.
     * @returns A value that starts fast, then slows down, then speeds up again.
     */
    BumpEasing: (t: number) => number;
};
/**
 * A function that takes a time value between 0 and 1 and returns an eased value between 0 and 1.
 * @param t The time value between 0 and 1.
 * @returns The eased value between 0 and 1.
 */
type EasingFunction = (t: number) => number;
/**
 * Performs linear interpolation with optional easing function on two numeric values
 * @param start Starting numeric value
 * @param end Ending numeric value
 * @param t Progress indicator between starting and ending numeric values, typically represented as a decimal within range [0,1]
 * @param easing Optional easing function to apply. Defaults to Easing.Linear if not provided or invalid type supplied
 * @return Interpolated result based on provided inputs
 */
export declare function lerp(start: number, end: number, t: number, easing?: EasingFunction): number;
export declare function lerpVec3(out: vec3, start: vec3, end: vec3, t: number, easing?: EasingFunction): vec3;
export declare function lerpArr<T extends NumberArray>(out: T, start: T, end: T, t: number, easing?: EasingFunction): T;
export {};
