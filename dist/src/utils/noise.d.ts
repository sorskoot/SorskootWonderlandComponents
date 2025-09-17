declare function seed(seed: number): void;
declare function simplex2(xin: number, yin: number): number;
declare function simplex3(xin: number, yin: number, zin: number): number;
declare function perlin2(x: number, y: number): number;
declare function perlin3(x: number, y: number, z: number): number;
export declare const Noise: {
    simplex2: typeof simplex2;
    simplex3: typeof simplex3;
    perlin2: typeof perlin2;
    perlin3: typeof perlin3;
    seed: typeof seed;
};
export {};
