import { Component, Object3D, WonderlandEngine } from '@wonderlandengine/api';
import { CellData, Tilemap } from '../classes/Tilemap.js';
/**
 * Base component for generating a tile map and wiring optional interaction.
 *
 * This generic class manages a Tilemap<T> instance and (optionally) a
 * TileInteract component that routes input events for individual tiles.
 *
 * Subclasses could override protected hooks like `onTileClick`,
 * `onTileHover` and `onTileUnhover` to implement game-specific behaviour.
 */
export declare class GenerateMapBase<T extends CellData> extends Component {
    /**
     * Ensure the `TileInteract` component is registered with the engine.
     * Wonderland's component registration is static per-engine, so we register
     * TileInteract here if it isn't already present.
     *
     * @param engine - The WonderlandEngine instance being used.
     */
    static onRegister(engine: WonderlandEngine): void;
    /**
     * Array of Object3D references used as tile visuals or templates.
     *
     * Marked with @property.array so it is editable inside the editor.
     */
    tileObjects: Object3D[];
    /**
     * Map dimensions as a [width, height] pair. Default is [10, 10].
     *
     * This is shown in the editor as a vector2 property.
     */
    dimensions: number[];
    tileSize: number[];
    offset: number[];
    /**
     * When true, the component will add/lookup a TileInteract component on
     * the same object and wire its events to this class' handlers.
     */
    interactive: boolean;
    /**
     * The underlying Tilemap instance that stores the grid data. This is
     * created during `start()`.
     */
    protected tilemap?: Tilemap<T>;
    /**
     * Optional TileInteract instance attached to the same object. Only set
     * when `interactive` is true and the component is present or added.
     *
     * This field is private to prevent external mutation.
     */
    private _tileInteract?;
    /**
     * Component lifecycle `start` hook.
     *
     * Creates the Tilemap with the configured dimensions and, when
     * `interactive` is true, ensures a TileInteract component is available
     * and connected to the map instance.
     */
    start(): void;
    /**
     * Called when the component is activated (object enabled).
     *
     * When interactive, subscribes to TileInteract events.
     */
    onActivate(): void;
    /**
     * Called when the component is deactivated (object disabled).
     *
     * Unsubscribes from TileInteract events to avoid leaks and double-calls.
     */
    onDeactivate(): void;
    /**
     * Internal click event handler that forwards to `onTileClick` hook.
     *
     * Kept as a private arrow property so we can add/remove the same
     * function reference to Wonderland event lists.
     */
    private _onTileClick;
    /**
     * Internal hover event handler that forwards to `onTileHover` hook.
     */
    private _onTileHover;
    /**
     * Internal unhover event handler that forwards to `onTileUnhover` hook.
     */
    private _onTileUnhover;
    /**
     * Hook called when a tile is clicked. Subclasses should override this to
     * react to click events on individual tiles.
     *
     * @param tile - The tile data that was clicked.
     */
    protected onTileClick(tile: T): void;
    /**
     * Hook called when a tile is hovered. Subclasses should override this to
     * show hover states or tooltips.
     *
     * @param tile - The tile data being hovered.
     */
    protected onTileHover(tile: T): void;
    /**
     * Hook called when a tile hover ends. Subclasses should override this to
     * clear hover UI/state.
     *
     * @param tile - The tile data that was unhovered.
     */
    protected onTileUnhover(tile: T): void;
}
