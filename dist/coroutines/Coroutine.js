export class Coroutine {
    generator;
    constructor(generator) {
        this.generator = generator;
    }
    update(deltaTime) {
        const result = this.generator.next(deltaTime);
        if (result.done) {
            return false; // Remove this coroutine.
        }
        return true; // Continue running this coroutine in the next frame.
    }
}
