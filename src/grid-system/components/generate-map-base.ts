import {
    Component,
    Object3D,
    Property,
    WonderlandEngine,
    property,
} from '@wonderlandengine/api';
import {CellData, Tilemap} from '../classes/Tilemap.js';
import {TileInteract} from './tile-interact.js';

/**
 * Base component for generating a tile map and wiring optional interaction.
 *
 * This generic class manages a Tilemap<T> instance and (optionally) a
 * TileInteract component that routes input events for individual tiles.
 *
 * Subclasses could override protected hooks like `onTileClick`,
 * `onTileHover` and `onTileUnhover` to implement game-specific behaviour.
 */
export class GenerateMapBase<T extends CellData> extends Component {
    static TypeName = 'generate-map-base';

    protected get currentHoveredTile(): T | null {
        return this._currentHoveredTile;
    }

    private _currentHoveredTile: T | null = null;

    /**
     * Ensure the `TileInteract` component is registered with the engine.
     * Wonderland's component registration is static per-engine, so we register
     * TileInteract here if it isn't already present.
     *
     * @param engine - The WonderlandEngine instance being used.
     */
    static onRegister(engine: WonderlandEngine) {
        if (!engine.isRegistered(TileInteract)) {
            engine.registerComponent(TileInteract);
        }
    }

    /**
     * Map dimensions as a [width, height] pair. Default is [10, 10].
     *
     * This is shown in the editor as a vector2 property.
     */
    @property.vector2(10, 10)
    dimensions = [10, 10];

    @property.vector2(1, 1)
    tileSize = [1, 1];

    @property.vector2(0, 0)
    offset = [0, 0];
    /**
     * When true, the component will add/lookup a TileInteract component on
     * the same object and wire its events to this class' handlers.
     */
    @property.bool(true)
    interactive = true;

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
    private _tileInteract: TileInteract | null | undefined = undefined;
    /**
     * Component lifecycle `start` hook.
     *
     * Creates the Tilemap with the configured dimensions and, when
     * `interactive` is true, ensures a TileInteract component is available
     * and connected to the map instance.
     */
    start() {
        this.tilemap = new Tilemap<T>();
        this.tilemap.setTileSize(this.tileSize[0], this.tileSize[1]);
        this.tilemap.setOffset(this.offset[0], this.offset[1]);
        this.tilemap.createMap(this.dimensions[0], this.dimensions[1]);

        if (this.interactive) {
            this._tileInteract = this.object.getComponent(TileInteract);
            if (!this._tileInteract) {
                this._tileInteract = this.object.addComponent(TileInteract);
            }
            this._tileInteract.map = this.tilemap;
        }
    }

    /**
     * Called when the component is activated (object enabled).
     *
     * When interactive, subscribes to TileInteract events.
     */
    onActivate(): void {
        if (this.interactive && this._tileInteract) {
            this._tileInteract.onClick.add(this._onTileClick);
            this._tileInteract.onHover.add(this._onTileHover);
            this._tileInteract.onUnhover.add(this._onTileUnhover);
        }
    }

    /**
     * Called when the component is deactivated (object disabled).
     *
     * Unsubscribes from TileInteract events to avoid leaks and double-calls.
     */
    onDeactivate(): void {
        if (this.interactive && this._tileInteract) {
            this._tileInteract.onClick.remove(this._onTileClick);
            this._tileInteract.onHover.remove(this._onTileHover);
            this._tileInteract.onUnhover.remove(this._onTileUnhover);
        }
    }

    /**
     * Internal click event handler that forwards to `onTileClick` hook.
     *
     * Kept as a private arrow property so we can add/remove the same
     * function reference to Wonderland event lists.
     */
    private _onTileClick = (tile: CellData | null) => {
        this.onTileClick(tile as T);
    };

    /**
     * Internal hover event handler that forwards to `onTileHover` hook.
     */
    private _onTileHover = (tile: CellData | null) => {
        this._currentHoveredTile = tile as T | null;
        this.onTileHover(tile as T);
    };

    /**
     * Internal unhover event handler that forwards to `onTileUnhover` hook.
     */
    private _onTileUnhover = (tile: CellData | null) => {
        this._currentHoveredTile = null;
        this.onTileUnhover(tile as T);
    };

    /**
     * Hook called when a tile is clicked. Subclasses should override this to
     * react to click events on individual tiles.
     *
     * @param tile - The tile data that was clicked.
     */
    protected onTileClick(tile: T) {}

    /**
     * Hook called when a tile is hovered. Subclasses should override this to
     * show hover states or tooltips.
     *
     * @param tile - The tile data being hovered.
     */
    protected onTileHover(tile: T) {}

    /**
     * Hook called when a tile hover ends. Subclasses should override this to
     * clear hover UI/state.
     *
     * @param tile - The tile data that was unhovered.
     */
    protected onTileUnhover(tile: T) {}
}
