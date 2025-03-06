import { Object3D } from '@wonderlandengine/api';
/**
 * Helper function to trigger haptic feedback pulse.
 *
 * @param {Object3D} object An object with 'input' component attached
 * @param {number} strength Strength from 0.0 - 1.0
 * @param {number} duration Duration in milliseconds
 */
export declare function hapticFeedback(object: Object3D, strength: number, duration: number): void;
/**
 * vibrate the device if possible
 */
export declare function vibrateDevice(amount?: number): void;
