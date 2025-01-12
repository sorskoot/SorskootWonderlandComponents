import {Component, Object3D} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';

export class Tags extends Component {
    static TypeName = 'tags';

    private static tagMap: Map<string, Tags[]> = new Map();

    /**
     * A space-separated list of tags.
     *
     * Note: Do not change the tags at runtime.
     * If you need to change it, use the Tags.setTag method.
     */
    @property.string()
    tags!: string;

    start() {
        this._addToTagMap();
    }

    onDestroy(): void {
        this._removeFromTagMap();
    }

    /**
     * @param {string} tag the tag to test
     */
    hasTag(tag: string) {
        const tags = this.getAll();
        return !!~tags.indexOf(tag);
    }

    private _addToTagMap() {
        const tags = this.getAll();
        tags.forEach((tag) => {
            if (!Tags.tagMap.has(tag)) {
                Tags.tagMap.set(tag, []);
            }
            Tags.tagMap.get(tag)!.push(this);
        });
    }

    private _removeFromTagMap() {
        const tags = this.getAll();
        tags.forEach((tag) => {
            const list = Tags.tagMap.get(tag);
            if (list) {
                const index = list.indexOf(this);
                if (index > -1) {
                    list.splice(index, 1);
                }
                if (list.length === 0) {
                    Tags.tagMap.delete(tag);
                }
            }
        });
    }

    private _updateTags(newTags: string) {
        this._removeFromTagMap();
        this.tags = newTags;
        this._addToTagMap();
    }

    /**
     * Returns all objects with the given tag.
     * @param tag tag to search for
     * @returns an array of Object with the given tag, access the tags or the obects here.
     */
    static getObjectsWithTag(tag: string): Object3D[] {
        return Tags.tagMap.get(tag)?.map((tag) => tag.object) ?? [];
    }

    private getAll() {
        return this.tags.split(/\W+/g);
    }

    static hasTag(object: Object3D, tag: string) {
        const tags = object.getComponent(Tags);
        if (tags) {
            return tags.hasTag(tag);
        }
        return false;
    }

    static getFirst(object: Object3D) {
        const tags = object.getComponent(Tags);
        if (tags) {
            return tags.getAll()[0];
        }
        return ''; // no tags
    }

    /**
     * Sets the tag on an object, overwriting any existing tags.
     * If the object does not have a Tags component, one will be added.
     * @param {Object3D} object the object to set the tag on
     * @param {string} tag the tag to set
     */
    static setTag(object: Object3D, tag: string) {
        let tags = object.getComponent(Tags);
        if (!tags) {
            tags = object.addComponent(Tags, {
                tags: tag,
            });
            return;
        }
        tags._updateTags(tag);
    }
}
