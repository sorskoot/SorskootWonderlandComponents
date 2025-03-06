/**
 * Helper function to trigger haptic feedback pulse.
 *
 * @param {Object3D} object An object with 'input' component attached
 * @param {number} strength Strength from 0.0 - 1.0
 * @param {number} duration Duration in milliseconds
 */
export function hapticFeedback(object, strength, duration) {
    const input = object.getComponent('input');
    if (input && input.xrInputSource) {
        const gamepad = input.xrInputSource.gamepad;
        if (gamepad && gamepad.hapticActuators) {
            const hapticActiator = gamepad.hapticActuators[0];
            hapticActiator.pulse(strength, duration);
        }
    }
}
/**
 * vibrate the device if possible
 */
export function vibrateDevice(amount = 10) {
    // check if the user has interacted with the page
    if (navigator.userActivation.hasBeenActive) {
        if ('vibrate' in navigator) {
            try {
                navigator.vibrate(amount);
            }
            catch (e) {
                // log any errors, but don't crash the app, it's not worth it
                console.log(e);
            }
        }
    }
}
