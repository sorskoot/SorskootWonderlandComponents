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
};
/**
 * Performs linear interpolation with optional easing function on two numeric values
 * @param start Starting numeric value
 * @param end Ending numeric value
 * @param t Progress indicator between starting and ending numeric values, typically represented as a decimal within range [0,1]
 * @param easing Optional easing function to apply. Defaults to Easing.Linear if not provided or invalid type supplied
 * @return Interpolated result based on provided inputs
 */
export declare function lerp(start: number, end: number, t: number, easing?: Function): number;
/**
 * Clamps input value to provided minimum & maximum range
 * @param value Numeric input for clamping operation
 * @param min Minimum allowed result after clamping )
 * @param max Maximum allowed result after clamping
 * @return Resulting output within specified constraint range [min,max]
 */
export declare function clamp(value: number, min: number, max: number): number;
