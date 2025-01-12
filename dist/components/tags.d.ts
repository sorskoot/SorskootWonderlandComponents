import { Component, Object3D } from '@wonderlandengine/api';
export declare class Tags extends Component {
    static TypeName: string;
    private static tagMap;
    /**
     * A space-separated list of tags.
     *
     * Note: Do not change the tags at runtime.
     * If you need to change it, use the Tags.setTag method.
     */
    tags: string;
    start(): void;
    onDestroy(): void;
    /**
     * @param {string} tag the tag to test
     */
    hasTag(tag: string): boolean;
    private _addToTagMap;
    private _removeFromTagMap;
    private _updateTags;
    /**
     * Returns all objects with the given tag.
     * @param tag tag to search for
     * @returns an array of Object with the given tag, access the tags or the obects here.
     */
    static getObjectsWithTag(tag: string): Object3D[];
    private getAll;
    static hasTag(object: Object3D, tag: string): boolean;
    static getFirst(object: Object3D): string;
    /**
     * Sets the tag on an object, overwriting any existing tags.
     * If the object does not have a Tags component, one will be added.
     * @param {Object3D} object the object to set the tag on
     * @param {string} tag the tag to set
     */
    static setTag(object: Object3D, tag: string): void;
}
