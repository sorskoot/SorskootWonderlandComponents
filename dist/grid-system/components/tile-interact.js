import { Component, Emitter, PhysXComponent, Shape, } from '@wonderlandengine/api';
import { Cursor, CursorTarget } from '@wonderlandengine/components';
/** Reused temporary to avoid allocations in update handlers. */
const ownPos = new Float32Array(3);
/**
 * Component that exposes simple cursor-based interaction for a Tilemap.
 *
 * This component adds/uses a `CursorTarget` and a `PhysXComponent` (plane)
 * on the same object so that Wonderland's cursor system can raycast against
 * it. Cursor events are translated into tile coordinates for a provided
 * `Tilemap<CellData>` instance and emitted through `onClick`, `onHover`
 * and `onUnhover` emitters.
 */
export class TileInteract extends Component {
    /** The registration name used by Wonderland. */
    static TypeName = 'tile-interact';
    /**
     * Ensure `CursorTarget` is registered with the engine. Called once when
     * the engine loads components.
     *
     * @param engine - WonderlandEngine instance to register with.
     */
    static onRegister(engine) {
        if (!engine.isRegistered(CursorTarget)) {
            engine.registerComponent(CursorTarget);
        }
    }
    /** CursorTarget instance used to receive cursor events. */
    _cursorTarget;
    /**
     * The Tilemap instance this component will query for tile data. When set
     * the component will convert cursor world positions to tile coordinates
     * and look up the corresponding tile.
     */
    map;
    /** Emitted when a tile is clicked. Provides the clicked CellData. */
    onClick = new Emitter();
    /** Emitted when the cursor moves over a new tile. */
    onHover = new Emitter();
    /** Emitted when the cursor leaves a previously hovered tile. */
    onUnhover = new Emitter();
    /**
     * start lifecycle: ensure physics is enabled and attach required
     * components (CursorTarget, PhysXComponent plane) if they are missing.
     */
    start() {
        if (!this.engine.physics) {
            console.error('TileInteract: Physics not enabled');
        }
        this._cursorTarget =
            this.object.getComponent(CursorTarget) ??
                this.object.addComponent(CursorTarget);
        // Ensure a static PhysX plane exists for cursor raycasts.
        const physx = this.object.getComponent(PhysXComponent) ??
            this.object.addComponent(PhysXComponent, {
                shape: Shape.Plane,
                rotationOffset: [0.0, 0.0, 0.7071068286895752, 0.7071068286895752],
                static: true,
            });
    }
    /**
     * When activated, subscribe to cursor click and move events.
     */
    onActivate() {
        this._cursorTarget.onClick.add(this._onClick);
        this._cursorTarget.onMove.add(this._onMove);
    }
    /**
     * When deactivated, unsubscribe to avoid duplicate listeners or leaks.
     */
    onDeactivate() {
        this._cursorTarget.onClick.remove(this._onClick);
        this._cursorTarget.onMove.remove(this._onMove);
    }
    /**
     * Convert a cursor hit position into map-relative tile coordinates.
     *
     * @param cursor - Cursor data from the cursor event.
     * @returns Object containing x and y in tile-space (can be fractional).
     */
    _toRelativePos(cursor) {
        if (!this.map) {
            throw new Error('TileInteract: No map assigned');
        }
        const cursorHitPos = cursor.cursorPos;
        this.object.getPositionWorld(ownPos);
        console.log('ownPos', cursorHitPos[0], cursorHitPos[2]);
        return this.map.worldToTile(cursorHitPos[0], cursorHitPos[2]);
    }
    /**
     * Internal click handler that looks up the tile under the cursor and
     * notifies listeners via the `onClick` emitter.
     */
    _onClick = (target, cursor) => {
        if (!this.map) {
            console.warn('TileInteract: No map assigned');
            return;
        }
        if (!(cursor instanceof Cursor)) {
            console.warn('TileInteract: Unsupported cursor type');
            return;
        }
        const relativePos = this._toRelativePos(cursor);
        const tile = this.map.getTile(relativePos.x, relativePos.y);
        this.onClick.notify(tile);
    };
    /** The previously hovered tile (or null). Used to emit unhover events. */
    _previousTile = null;
    /**
     * Internal move handler that emits `onHover` and `onUnhover` when the
     * hovered tile changes.
     */
    _onMove = (target, cursor) => {
        if (!this.map) {
            console.warn('TileInteract: No map assigned');
            return;
        }
        if (!(cursor instanceof Cursor)) {
            console.warn('TileInteract: Unsupported cursor type');
            return;
        }
        const relativePos = this._toRelativePos(cursor);
        const tile = this.map.getTile(relativePos.x, relativePos.y);
        if (tile !== this._previousTile) {
            if (this._previousTile) {
                this.onUnhover.notify(this._previousTile);
            }
            if (tile) {
                this.onHover.notify(tile);
            }
            this._previousTile = tile;
        }
    };
}
