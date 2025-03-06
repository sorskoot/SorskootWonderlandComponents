export class Coroutine {
    private generator: Generator<any, void, unknown>;
    constructor(generator: Generator<any, void, unknown>) {
        this.generator = generator;
    }

    update(deltaTime: number): boolean {
        const result = this.generator.next(deltaTime);
        if (result.done) {
            return false; // Remove this coroutine.
        }
        return true; // Continue running this coroutine in the next frame.
    }
}
