export declare class Coroutine {
    private generator;
    private waitTime;
    constructor(generator: Generator<any, void, unknown>);
    update(deltaTime: number): boolean;
}
