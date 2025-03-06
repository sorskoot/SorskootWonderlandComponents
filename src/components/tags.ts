import {Component, Object3D} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';

/**
 * The Tags component allows you to assign and manage tags on objects.
 *
 * Tags are space-separated strings that can be used to categorize or label objects
 * for easy retrieval and manipulation. This component maintains an internal map
 * to keep track of all objects associated with each tag, enabling efficient queries
 * and operations based on tags.
 *
 * Note: Do not change the tags at runtime. If you need to change it, use the Tags.setTag method.
 */
export class Tags extends Component {
    static TypeName = 'tags';

    private static _tagMap: Map<string, Tags[]> = new Map();

    /**
     * A space-separated list of tags.
     *
     * Note: Do not change the tags at runtime.
     * If you need to change it, use the Tags.setTag method.
     */
    @property.string()
    tags!: string;

    start(): void {
        this._addToTagMap();
    }

    onDestroy(): void {
        this._removeFromTagMap();
    }

    /**
     * Checks if the current object has a specific tag.
     * @param tag - The tag to test.
     * @returns `true` if the object has the specified tag, otherwise `false`.
     */
    hasTag(tag: string): boolean {
        const tags = this._getAll();
        return tags.includes(tag);
    }

    /**
     * Returns all objects with the given tag.
     * @param tag - The tag to search for.
     * @returns An array of objects with the given tag.
     */
    static getObjectsWithTag(tag: string): Object3D[] {
        return Tags._tagMap.get(tag)?.map((entry) => entry.object) ?? [];
    }

    /**
     * Retrieves all tags associated with a given object.
     * @param object - The object to retrieve tags from.
     * @returns An array of tags associated with the object.
     */
    static getTags(object: Object3D): string[] {
        const tags = object.getComponent(Tags);
        if (tags) {
            return tags._getAll();
        }
        return [];
    }

    /**
     * Checks if a given object has a specific tag.
     * @param object - The object to check.
     * @param tag - The tag to test.
     * @returns `true` if the object has the specified tag, otherwise `false`.
     */
    static hasTag(object: Object3D, tag: string): boolean {
        const tags = object.getComponent(Tags);
        if (tags) {
            return tags.hasTag(tag);
        }
        return false;
    }

    /**
     * Retrieves the first tag for a given object.
     * @param object - The object to retrieve the first tag from.
     * @returns The first tag of the object, or an empty string if no tags are found.
     */
    static getFirst(object: Object3D): string {
        const tags = object.getComponent(Tags);
        if (tags) {
            return tags._getAll()[0];
        }
        return ''; // no tags
    }

    /**
     * Sets the tag on an object, overwriting any existing tags.
     * If the object does not have a Tags component, one will be added.
     * @param object - The object to set the tag on.
     * @param tag - The tag to set.
     */
    static setTag(object: Object3D, tag: string): void {
        let tags = object.getComponent(Tags);
        if (!tags) {
            tags = object.addComponent(Tags, {
                tags: tag,
            });
            return;
        }
        tags._updateTags(tag);
    }

    /**
     * Retrieves all tags of the current object.
     * @returns An array of tags.
     * @private
     */
    private _getAll(): string[] {
        return this.tags.split(/\W+/g).filter(Boolean);
    }

    /**
     * Adds the current object to the tag map.
     * @private
     */
    private _addToTagMap(): void {
        const tags = this._getAll();
        tags.forEach((tag) => {
            if (!Tags._tagMap.has(tag)) {
                Tags._tagMap.set(tag, []);
            }
            Tags._tagMap.get(tag)!.push(this);
        });
    }

    /**
     * Removes the current object from the tag map.
     * @private
     */
    private _removeFromTagMap(): void {
        const tags = this._getAll();
        tags.forEach((tag) => {
            const list = Tags._tagMap.get(tag);
            if (list) {
                const index = list.indexOf(this);
                if (index > -1) {
                    list.splice(index, 1);
                }
                if (list.length === 0) {
                    Tags._tagMap.delete(tag);
                }
            }
        });
    }

    /**
     * Updates the tags of the current object and modifies the tag map.
     * @param newTags - The new tags to set.
     * @private
     */
    private _updateTags(newTags: string): void {
        this._removeFromTagMap();
        this.tags = newTags;
        this._addToTagMap();
    }
}
