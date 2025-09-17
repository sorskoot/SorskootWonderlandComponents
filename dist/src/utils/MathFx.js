import { lerp } from './lerp.js';
import { Mathf } from './Mathf.js';
function sinerp(start, end, value) {
    return lerp(start, end, Math.sin(value * Math.PI * 0.5));
}
/**
 * returns the number of degrees between two angles in a specific direction.
 */
function directionalAngleDelta(first, second, forward) {
    const firstClamped = Mathf.repeat(first, 360.0);
    const secondClamped = Mathf.repeat(second, 360.0);
    let forwardDistance = secondClamped - firstClamped;
    let reverseDistance = firstClamped + 360 - secondClamped;
    if (secondClamped < firstClamped) {
        reverseDistance = firstClamped - secondClamped;
        forwardDistance = secondClamped + 360 - firstClamped;
    }
    return forward ? forwardDistance : reverseDistance;
}
function moveTowardsAngleDirection(current, target, maxDelta, forward) {
    const currentClamped = Mathf.repeat(current, 360.0);
    const targetClamped = Mathf.repeat(target, 360.0);
    let result = currentClamped;
    if (forward) {
        if (currentClamped < targetClamped) {
            if (currentClamped + maxDelta >= targetClamped) {
                result = targetClamped;
            }
            else {
                result = currentClamped + maxDelta;
            }
        }
        else {
            // move forward around the circle until we reach target
            if (currentClamped + maxDelta < 360.0) {
                result = currentClamped + maxDelta;
            }
            else {
                const wrapped = Mathf.repeat(currentClamped + maxDelta, 360.0);
                if (wrapped < targetClamped) {
                    result = wrapped;
                }
                else {
                    result = targetClamped;
                }
            }
        }
    }
    else {
        // backwards
        if (currentClamped > targetClamped) {
            if (currentClamped - maxDelta <= targetClamped) {
                result = targetClamped;
            }
            else {
                result = currentClamped - maxDelta;
            }
        }
        else {
            if (currentClamped - maxDelta > 0.0) {
                result = currentClamped - maxDelta;
            }
            else {
                const wrapped = Mathf.repeat(currentClamped - maxDelta, 360.0);
                if (wrapped > targetClamped) {
                    result = wrapped;
                }
                else {
                    result = targetClamped;
                }
            }
        }
    }
    return result;
}
export const Mathfx = {
    sinerp,
    directionalAngleDelta,
    moveTowardsAngleDirection,
};
