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
export class Tilemap {
    /**
     * Getters for dimensions. 0 means not initialized or zero size.
     */
    /** Width in tiles. Returns 0 when dimensions are not set. */
    get width() {
        return this._width;
    }
    /** Height in tiles. Returns 0 when dimensions are not set. */
    get height() {
        return this._height;
    }
    /**
     * Tile physical size (world units). Defaults to 1.
     * Use `setTileSize` to change both dimensions.
     */
    get tileWidth() {
        return this._tileWidth;
    }
    get tileHeight() {
        return this._tileHeight;
    }
    /**
     * Offset to add to world-to-tile conversions. Defaults to 0.
     */
    get offsetX() {
        return this._offsetX;
    }
    get offsetY() {
        return this._offsetY;
    }
    /** Create an empty Tilemap. Call `createMap` to initialize bounds. */
    constructor(tileWidth = 1, tileHeight = 1) {
        /** Internal storage mapping "x,y" -> tile or null. */
        this._map = new Map();
        /** Width of the map in tiles. 0 means uninitialized or dynamic. */
        this._width = 0;
        /** Height of the map in tiles. 0 means uninitialized or dynamic. */
        this._height = 0;
        /**
         * Tile size in world units (width and height). Defaults to 1.
         * These are private backing fields; use the getters/setter below.
         */
        this._tileWidth = 1;
        this._tileHeight = 1;
        this._offsetX = 0;
        this._offsetY = 0;
        // allow optional construction with tile size, still backwards-compatible
        this.setTileSize(tileWidth, tileHeight);
    }
    /**
     * Set tile size in world units. `height` defaults to `width` if omitted.
     * Throws when width or height are not positive numbers.
     *
     * @param width - Tile width in world units (must be > 0).
     * @param height - Tile height in world units (must be > 0).
     */
    setTileSize(width, height = width) {
        if (typeof width !== 'number' ||
            typeof height !== 'number' ||
            isNaN(width) ||
            isNaN(height) ||
            width <= 0 ||
            height <= 0) {
            throw new Error('Tilemap.setTileSize: width and height must be > 0');
        }
        this._tileWidth = width;
        this._tileHeight = height;
    }
    setOffset(x, y) {
        if (typeof x !== 'number' ||
            typeof y !== 'number' ||
            isNaN(x) ||
            isNaN(y)) {
            throw new Error('Tilemap.setOffset: x and y must be numbers');
        }
        this._offsetX = x;
        this._offsetY = y;
    }
    /**
     * Convert a world position to tile coordinates. Uses Math.floor so world
     * coordinates map into integer grid indices. Negative world coordinates
     * will produce negative tile indices; callers should check bounds via
     * `getTile`/`hasTile` when the map is bounded.
     *
     * Accounts for the offset (shifts the grid origin).
     *
     * @param wx - World X position.
     * @param wy - World Y position.
     */
    worldToTile(wx, wy) {
        const tx = Math.floor((wx - this._offsetX) / this._tileWidth);
        const ty = Math.floor((wy - this._offsetY) / this._tileHeight);
        return { x: tx, y: ty };
    }
    /**
     * Convert tile coordinates to the world position of the tile origin
     * (top-left / minimum corner). If you need the center, use
     * `tileToWorldCenter`.
     *
     * Accounts for the offset (shifts the grid origin).
     *
     * @param x - Tile X coordinate (integer).
     * @param y - Tile Y coordinate (integer).
     */
    tileToWorldOrigin(x, y) {
        return {
            x: x * this._tileWidth + this._offsetX,
            y: y * this._tileHeight + this._offsetY,
        };
    }
    /**
     * Convert tile coordinates to the world position of the tile center.
     *
     * Accounts for the offset (shifts the grid origin).
     *
     * @param x - Tile X coordinate (integer).
     * @param y - Tile Y coordinate (integer).
     */
    tileToWorldCenter(x, y) {
        return {
            x: (x + 0.5) * this._tileWidth + this._offsetX,
            y: (y + 0.5) * this._tileHeight + this._offsetY,
        };
    }
    /**
     * Convert a tile object to its world center position.
     *
     * Accounts for the offset (shifts the grid origin).
     *
     * @param tile - The tile object.
     */
    tileToWorldPosition(tile) {
        return {
            x: (tile.x + 0.5) * this._tileWidth + this._offsetX,
            y: (tile.y + 0.5) * this._tileHeight + this._offsetY,
        };
    }
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
    createMap(width, height) {
        if (width < 0 || height < 0) {
            throw new Error('Tilemap.createMap: width and height must be non-negative');
        }
        this._width = width | 0; // ensure integers
        this._height = height | 0; //    ensure integers
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const id = this._createId(x, y);
                this._map.set(id, { id, x, y });
            }
        }
    }
    /**
     * Return the tile for a map id string ("x,y") or null when the cell
     * is empty or the id is not present.
     *
     * @param id - Tile id in the form "x,y".
     */
    getTileById(id) {
        return this._map.get(id) || null;
    }
    /**
     * Return the tile at the given integer coordinates or null if the cell
     * is empty or out of bounds (when dimensions are set).
     *
     * @param x - X coordinate.
     * @param y - Y coordinate.
     */
    getTile(x, y) {
        if (x === undefined ||
            y === undefined ||
            isNaN(x) ||
            isNaN(y) ||
            x < 0 ||
            y < 0 ||
            x >= this._width ||
            y >= this._height) {
            return null;
        }
        const id = this._createId(x, y);
        return this.getTileById(id);
    }
    /**
     * Returns true when a non-null tile exists at the given coordinates.
     * This returns false for empty cells (explicitly set to null) and for
     * coordinates that were never populated.
     *
     * @param x - X coordinate.
     * @param y - Y coordinate.
     */
    hasTile(x, y) {
        const id = this._createId(x, y);
        const v = this._map.get(id);
        return v !== undefined && v !== null;
    }
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
    setTile(x, y, tile) {
        if (this._width > 0 && this._height > 0) {
            if (x < 0 || y < 0 || x >= this._width || y >= this._height) {
                throw new Error('Tilemap.setTile: coordinates out of bounds');
            }
        }
        const id = this._createId(x, y);
        if (tile !== null) {
            // ensure tile has consistent id/x/y
            tile.id = id;
            tile.x = x | 0; // ensure integers
            tile.y = y | 0;
            this._map.set(id, tile);
        }
        else {
            // allow explicit setting to null
            this._map.set(id, null);
        }
    }
    /**
     * Remove a tile at the specified coordinates by setting the cell to
     * `null`. If the cell was not present nothing happens.
     *
     * @param x - X coordinate.
     * @param y - Y coordinate.
     */
    removeTile(x, y) {
        const id = this._createId(x, y);
        if (this._map.has(id)) {
            this._map.set(id, null);
        }
    }
    /**
     * Iterate over stored non-null tiles. This implements the ES iterable
     * protocol so the Tilemap can be used directly in `for..of` loops.
     */
    *[Symbol.iterator]() {
        for (const value of this._map.values()) {
            if (value !== null) {
                yield value;
            }
        }
    }
    /**
     * Return an iterator over non-null tiles (same as the default
     * iterable behaviour).
     */
    values() {
        return this[Symbol.iterator]();
    }
    /**
     * Iterate over stored coordinates as [x, y] pairs. Note this returns
     * coordinates for all entries (including those explicitly set to null).
     */
    *keys() {
        for (const key of this._map.keys()) {
            const [xs, ys] = key.split(',');
            yield [parseInt(xs, 10), parseInt(ys, 10)];
        }
    }
    /**
     * Iterate over non-null tile entries as [x, y, tile]. Useful for
     * exporting or debugging.
     */
    *entries() {
        for (const tile of this) {
            yield [tile.x, tile.y, tile];
        }
    }
    /**
     * Execute a callback for each non-null tile in the map.
     *
     * @param callback - Function invoked with each tile.
     */
    forEach(callback) {
        for (const tile of this) {
            callback(tile);
        }
    }
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
    getNeighbors(x, y, includeDiagonal = false) {
        x |= 0; // ensure integers
        y |= 0;
        const deltas = includeDiagonal
            ? [
                [-1, -1],
                [0, -1],
                [1, -1],
                [-1, 0],
                [1, 0],
                [-1, 1],
                [0, 1],
                [1, 1],
            ]
            : [
                [0, -1],
                [-1, 0],
                [1, 0],
                [0, 1],
            ];
        const neighbors = [];
        for (const [dx, dy] of deltas) {
            const nx = x + dx;
            const ny = y + dy;
            // if bounds known, skip out-of-range coordinates
            if (this._width > 0 && this._height > 0) {
                if (nx < 0 ||
                    ny < 0 ||
                    nx >= this._width ||
                    ny >= this._height) {
                    continue;
                }
            }
            const t = this.getTile(nx, ny);
            if (t !== null) {
                neighbors.push(t);
            }
        }
        return neighbors;
    }
    /**
     * Count the number of non-null tiles currently stored in the map.
     */
    count() {
        let c = 0;
        for (const v of this._map.values()) {
            if (v !== null) {
                c++;
            }
        }
        return c;
    }
    /**
     * Serialize non-null tiles to an array suitable for JSON encoding.
     * The returned array contains direct references to the stored tile
     * objects.
     */
    toJSON() {
        const out = [];
        for (const tile of this) {
            out.push(tile);
        }
        return out;
    }
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
    static fromJSON(data, width = 0, height = 0) {
        const tm = new Tilemap();
        if (width > 0 && height > 0) {
            tm.createMap(width, height);
            // replace with provided data
            for (const tile of data) {
                tm.setTile(tile.x, tile.y, tile);
            }
        }
        else {
            // populate map without dimension constraints
            for (const tile of data) {
                tm._map.set(`${tile.x},${tile.y}`, tile);
            }
        }
        return tm;
    }
    /**
     * Create the internal id string for coordinates. This canonicalizes
     * coordinates to integers and returns the form "x,y".
     *
     * @param x - X coordinate.
     * @param y - Y coordinate.
     */
    _createId(x, y) {
        return `${x | 0},${y | 0}`;
    }
}
