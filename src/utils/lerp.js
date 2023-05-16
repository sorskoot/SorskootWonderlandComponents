export const Easing = {
    Linear: t => t,
    InQuad: t => t * t,
    OutQuad: t => 1 - (1 - t) * (1 - t),
    InOutQuad: t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
};

export function lerp(start, end, t, easing = Easing.Linear) {
    if (typeof easing === 'function') {
        easing = getEasingFunction(easing);
    }
    
    return start * (1 - easing(t)) + end * easing(t);
}

function getEasingFunction(type) {
    // Default to linear interpolation
    return typeof type === 'function' ? type : Easing.Linear;
}

export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}