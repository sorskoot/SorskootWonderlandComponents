/**
 Notes.
 - The tilemap is a 2D map for tiles.
 - It is separated from the rendering.
 - Each tile is 1x1 unit in size. How to make it variable?
  - How to handle clicking on or hovering over a tile?

 - Ideas, but not for v1:
    - Chunking
    - Layers
 */
/**
 * Minimal tile cell data stored in the Tilemap.
 *
 * Implementations using `Tilemap<T>` should extend this shape so the map
 * can rely on `id`, `x` and `y` being present on each tile object.
 *
 * @example
 * type MyTile = CellData & { walkable: boolean };
 */
export type CellData = {
    /**
     * Stable identifier for the tile derived from its coordinates ("x,y").
     * The Tilemap will overwrite this when placing tiles to ensure
     * consistency.
     */
    id: string;
    /**
     * X coordinate of the tile (integer).
     */
    x: number;
    /**
     * Y coordinate of the tile (integer).
     */
    y: number;
};
/**
 * A lightweight 2D tile map storing arbitrary tile data keyed by integer
 * coordinates. Each tile occupies a 1x1 unit cell and is addressed by
 * its integer x,y coordinates. The Tilemap separates storage from rendering
 * and intentionally keeps a minimal API for managing tiles.
 *
 * The generic parameter T must extend `CellData` so the map can rely on
 * `id`, `x` and `y` fields being available on stored objects. The map
 * stores `null` values for explicitly cleared cells and skips them during
 * iteration.
 *
 * Example:
 * ```ts
 * const tm = new Tilemap<MyTileType>();
 * tm.createMap(10, 10);
 * tm.setTile(1, 2, { id: '', x: 1, y: 2, ... });
 * ```
 */
export declare class Tilemap<T extends CellData> {
    /** Internal storage mapping "x,y" -> tile or null. */
    private _map;
    /** Width of the map in tiles. 0 means uninitialized or dynamic. */
    private _width;
    /** Height of the map in tiles. 0 means uninitialized or dynamic. */
    private _height;
    /**
     * Getters for dimensions. 0 means not initialized or zero size.
     */
    /** Width in tiles. Returns 0 when dimensions are not set. */
    get width(): number;
    /** Height in tiles. Returns 0 when dimensions are not set. */
    get height(): number;
    /** Create an empty Tilemap. Call `createMap` to initialize bounds. */
    constructor();
    /**
     * Initialize a rectangular map of the provided size.
     *
     * This will populate every cell with a default tile object of type T
     * where the `id`, `x` and `y` fields are set. If width or height are
     * negative an error is thrown.
     *
     * @param width - Number of columns (must be >= 0).
     * @param height - Number of rows (must be >= 0).
     */
    createMap(width: number, height: number): void;
    /**
     * Return the tile for a map id string ("x,y") or null when the cell
     * is empty or the id is not present.
     *
     * @param id - Tile id in the form "x,y".
     */
    getTileById(id: string): T | null;
    /**
     * Return the tile at the given integer coordinates or null if the cell
     * is empty or out of bounds (when dimensions are set).
     *
     * @param x - X coordinate.
     * @param y - Y coordinate.
     */
    getTile(x: number | undefined, y: number | undefined): T | null;
    /**
     * Returns true when a non-null tile exists at the given coordinates.
     * This returns false for empty cells (explicitly set to null) and for
     * coordinates that were never populated.
     *
     * @param x - X coordinate.
     * @param y - Y coordinate.
     */
    hasTile(x: number, y: number): boolean;
    /**
     * Place or replace a tile at the given coordinates. If `tile` is `null`
     * the cell is explicitly marked empty. When the map has dimensions set
     * (via `createMap`) attempts to set tiles outside the bounds will throw.
     *
     * The method will also normalize the tile's `id`, `x` and `y` fields when
     * a non-null tile is provided to keep internal consistency.
     *
     * @param x - X coordinate.
     * @param y - Y coordinate.
     * @param tile - Tile object or `null` to clear the cell.
     */
    setTile(x: number, y: number, tile: T | null): void;
    /**
     * Remove a tile at the specified coordinates by setting the cell to
     * `null`. If the cell was not present nothing happens.
     *
     * @param x - X coordinate.
     * @param y - Y coordinate.
     */
    removeTile(x: number, y: number): void;
    /**
     * Iterate over stored non-null tiles. This implements the ES iterable
     * protocol so the Tilemap can be used directly in `for..of` loops.
     */
    [Symbol.iterator](): IterableIterator<T>;
    /**
     * Return an iterator over non-null tiles (same as the default
     * iterable behaviour).
     */
    values(): IterableIterator<T>;
    /**
     * Iterate over stored coordinates as [x, y] pairs. Note this returns
     * coordinates for all entries (including those explicitly set to null).
     */
    keys(): IterableIterator<[number, number]>;
    /**
     * Iterate over non-null tile entries as [x, y, tile]. Useful for
     * exporting or debugging.
     */
    entries(): IterableIterator<[number, number, T]>;
    /**
     * Execute a callback for each non-null tile in the map.
     *
     * @param callback - Function invoked with each tile.
     */
    forEach(callback: (tile: T) => void): void;
    /**
     * Return an array of neighboring non-null tiles around the given
     * coordinates. By default only orthogonal neighbors are returned; set
     * `includeDiagonal` to true to include diagonal neighbors.
     *
     * The method respects bounds when the map has been initialized with
     * `createMap` and will skip out-of-range coordinates.
     *
     * @param x - X coordinate.
     * @param y - Y coordinate.
     * @param includeDiagonal - When true include diagonal neighbors.
     */
    getNeighbors(x: number, y: number, includeDiagonal?: boolean): T[];
    /**
     * Count the number of non-null tiles currently stored in the map.
     */
    count(): number;
    /**
     * Serialize non-null tiles to an array suitable for JSON encoding.
     * The returned array contains direct references to the stored tile
     * objects.
     */
    toJSON(): Array<T>;
    /**
     * Reconstruct a Tilemap from an array of tile objects. If `width` and
     * `height` are provided a bounded map will be created first and then the
     * provided tiles will be placed; otherwise the map will remain
     * unbounded (dimensions 0) and tiles are inserted directly.
     *
     * @param data - Array of tile objects (must extend CellData).
     * @param width - Optional width to initialize the map with.
     * @param height - Optional height to initialize the map with.
     */
    static fromJSON<U extends CellData>(data: Array<U>, width?: number, height?: number): Tilemap<U>;
    /**
     * Create the internal id string for coordinates. This canonicalizes
     * coordinates to integers and returns the form "x,y".
     *
     * @param x - X coordinate.
     * @param y - Y coordinate.
     */
    private _createId;
}
