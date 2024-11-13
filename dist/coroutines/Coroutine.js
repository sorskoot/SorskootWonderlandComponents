import { WaitForSeconds } from './WaitForSeconds.js';
export class Coroutine {
    generator;
    waitTime = 0;
    constructor(generator) {
        this.generator = generator;
    }
    update(deltaTime) {
        if (this.waitTime > 0) {
            this.waitTime -= deltaTime;
            return true; // Continue running this coroutine in the next frame.
        }
        const result = this.generator.next();
        if (result.done) {
            return false; // Remove this coroutine.
        }
        if (result.value instanceof WaitForSeconds) {
            this.waitTime = result.value.seconds;
        }
        return true; // Continue running this coroutine in the next frame.
    }
}
