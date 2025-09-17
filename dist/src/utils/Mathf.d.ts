import { vec3 } from 'gl-matrix';
export declare const AxisX: vec3;
export declare const AxisY: vec3;
export declare const AxisZ: vec3;
export declare const AxisNegZ: vec3;
export declare const Vec3Zero: vec3;
export declare const Vec3One: vec3;
/**
 * Loops the value t, so that it is never larger than length and never smaller than 0.
 */
declare function repeat(t: number, length: number): number;
declare function fract(value: number): number;
/**
 * Clamps input value to provided minimum & maximum range
 * @param value Numeric input for clamping operation
 * @param min Minimum allowed result after clamping )
 * @param max Maximum allowed result after clamping
 * @return Resulting output within specified constraint range [min,max]
 */
export declare function clamp(value: number, min: number, max: number): number;
/**
 * Compares two floating point values and returns true if they are similar.
 * @returns true if the floating point values a and b are similar.
 */
declare function approximately(a: number, b: number): boolean;
export declare const Mathf: {
    Rad2Deg: number;
    Deg2Rad: number;
    repeat: typeof repeat;
    clamp: typeof clamp;
    approximately: typeof approximately;
    fract: typeof fract;
};
export {};
