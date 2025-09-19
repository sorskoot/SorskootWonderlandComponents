import { Component, Emitter, WonderlandEngine } from '@wonderlandengine/api';
import { CellData, Tilemap } from '../classes/Tilemap.js';
/**
 * Component that exposes simple cursor-based interaction for a Tilemap.
 *
 * This component adds/uses a `CursorTarget` and a `PhysXComponent` (plane)
 * on the same object so that Wonderland's cursor system can raycast against
 * it. Cursor events are translated into tile coordinates for a provided
 * `Tilemap<CellData>` instance and emitted through `onClick`, `onHover`
 * and `onUnhover` emitters.
 */
export declare class TileInteract extends Component {
    /** The registration name used by Wonderland. */
    static TypeName: string;
    /**
     * Ensure `CursorTarget` is registered with the engine. Called once when
     * the engine loads components.
     *
     * @param engine - WonderlandEngine instance to register with.
     */
    static onRegister(engine: WonderlandEngine): void;
    /** CursorTarget instance used to receive cursor events. */
    private _cursorTarget;
    /**
     * The Tilemap instance this component will query for tile data. When set
     * the component will convert cursor world positions to tile coordinates
     * and look up the corresponding tile.
     */
    map?: Tilemap<CellData>;
    /** Emitted when a tile is clicked. Provides the clicked CellData. */
    onClick: Emitter<[CellData | null]>;
    /** Emitted when the cursor moves over a new tile. */
    onHover: Emitter<[CellData | null]>;
    /** Emitted when the cursor leaves a previously hovered tile. */
    onUnhover: Emitter<[CellData | null]>;
    /**
     * start lifecycle: ensure physics is enabled and attach required
     * components (CursorTarget, PhysXComponent plane) if they are missing.
     */
    start(): void;
    /**
     * When activated, subscribe to cursor click and move events.
     */
    onActivate(): void;
    /**
     * When deactivated, unsubscribe to avoid duplicate listeners or leaks.
     */
    onDeactivate(): void;
    /**
     * Convert a cursor hit position into map-relative tile coordinates.
     *
     * @param cursor - Cursor data from the cursor event.
     * @returns Object containing x and y in tile-space (can be fractional).
     */
    private _toRelativePos;
    /**
     * Internal click handler that looks up the tile under the cursor and
     * notifies listeners via the `onClick` emitter.
     */
    private _onClick;
    /** The previously hovered tile (or null). Used to emit unhover events. */
    private _previousTile;
    /**
     * Internal move handler that emits `onHover` and `onUnhover` when the
     * hovered tile changes.
     */
    private _onMove;
}
