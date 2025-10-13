var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, property, } from '@wonderlandengine/api';
import { Tilemap } from '../classes/Tilemap.js';
import { TileInteract } from './tile-interact.js';
/**
 * Base component for generating a tile map and wiring optional interaction.
 *
 * This generic class manages a Tilemap<T> instance and (optionally) a
 * TileInteract component that routes input events for individual tiles.
 *
 * Subclasses could override protected hooks like `onTileClick`,
 * `onTileHover` and `onTileUnhover` to implement game-specific behaviour.
 */
export class GenerateMapBase extends Component {
    constructor() {
        super(...arguments);
        this._currentHoveredTile = null;
        /**
         * Map dimensions as a [width, height] pair. Default is [10, 10].
         *
         * This is shown in the editor as a vector2 property.
         */
        this.dimensions = [10, 10];
        this.tileSize = [1, 1];
        this.offset = [0, 0];
        /**
         * When true, the component will add/lookup a TileInteract component on
         * the same object and wire its events to this class' handlers.
         */
        this.interactive = true;
        /**
         * Optional TileInteract instance attached to the same object. Only set
         * when `interactive` is true and the component is present or added.
         *
         * This field is private to prevent external mutation.
         */
        this._tileInteract = undefined;
        /**
         * Internal click event handler that forwards to `onTileClick` hook.
         *
         * Kept as a private arrow property so we can add/remove the same
         * function reference to Wonderland event lists.
         */
        this._onTileClick = (tile) => {
            this.onTileClick(tile);
        };
        /**
         * Internal hover event handler that forwards to `onTileHover` hook.
         */
        this._onTileHover = (tile) => {
            this._currentHoveredTile = tile;
            this.onTileHover(tile);
        };
        /**
         * Internal unhover event handler that forwards to `onTileUnhover` hook.
         */
        this._onTileUnhover = (tile) => {
            this._currentHoveredTile = null;
            this.onTileUnhover(tile);
        };
    }
    get currentHoveredTile() {
        return this._currentHoveredTile;
    }
    /**
     * Ensure the `TileInteract` component is registered with the engine.
     * Wonderland's component registration is static per-engine, so we register
     * TileInteract here if it isn't already present.
     *
     * @param engine - The WonderlandEngine instance being used.
     */
    static onRegister(engine) {
        if (!engine.isRegistered(TileInteract)) {
            engine.registerComponent(TileInteract);
        }
    }
    /**
     * Component lifecycle `start` hook.
     *
     * Creates the Tilemap with the configured dimensions and, when
     * `interactive` is true, ensures a TileInteract component is available
     * and connected to the map instance.
     */
    start() {
        this.tilemap = new Tilemap();
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
    onActivate() {
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
    onDeactivate() {
        if (this.interactive && this._tileInteract) {
            this._tileInteract.onClick.remove(this._onTileClick);
            this._tileInteract.onHover.remove(this._onTileHover);
            this._tileInteract.onUnhover.remove(this._onTileUnhover);
        }
    }
    /**
     * Hook called when a tile is clicked. Subclasses should override this to
     * react to click events on individual tiles.
     *
     * @param tile - The tile data that was clicked.
     */
    onTileClick(tile) { }
    /**
     * Hook called when a tile is hovered. Subclasses should override this to
     * show hover states or tooltips.
     *
     * @param tile - The tile data being hovered.
     */
    onTileHover(tile) { }
    /**
     * Hook called when a tile hover ends. Subclasses should override this to
     * clear hover UI/state.
     *
     * @param tile - The tile data that was unhovered.
     */
    onTileUnhover(tile) { }
}
GenerateMapBase.TypeName = 'generate-map-base';
__decorate([
    property.vector2(10, 10)
], GenerateMapBase.prototype, "dimensions", void 0);
__decorate([
    property.vector2(1, 1)
], GenerateMapBase.prototype, "tileSize", void 0);
__decorate([
    property.vector2(0, 0)
], GenerateMapBase.prototype, "offset", void 0);
__decorate([
    property.bool(true)
], GenerateMapBase.prototype, "interactive", void 0);
