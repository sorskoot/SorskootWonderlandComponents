declare function sinerp(start: number, end: number, value: number): number;
/**
 * returns the number of degrees between two angles in a specific direction.
 */
declare function directionalAngleDelta(first: number, second: number, forward: boolean): number;
declare function moveTowardsAngleDirection(current: number, target: number, maxDelta: number, forward: boolean): number;
export declare const Mathfx: {
    sinerp: typeof sinerp;
    directionalAngleDelta: typeof directionalAngleDelta;
    moveTowardsAngleDirection: typeof moveTowardsAngleDirection;
};
export {};
