export declare class Coroutine {
    private generator;
    constructor(generator: Generator<any, void, unknown>);
    update(deltaTime: number): boolean;
}
