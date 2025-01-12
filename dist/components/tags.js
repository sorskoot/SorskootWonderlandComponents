var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@wonderlandengine/api';
import { property } from '@wonderlandengine/api/decorators.js';
export class Tags extends Component {
    static TypeName = 'tags';
    static tagMap = new Map();
    /**
     * A space-separated list of tags.
     *
     * Note: Do not change the tags at runtime.
     * If you need to change it, use the Tags.setTag method.
     */
    tags;
    start() {
        this._addToTagMap();
    }
    onDestroy() {
        this._removeFromTagMap();
    }
    /**
     * @param {string} tag the tag to test
     */
    hasTag(tag) {
        const tags = this.getAll();
        return !!~tags.indexOf(tag);
    }
    _addToTagMap() {
        const tags = this.getAll();
        tags.forEach((tag) => {
            if (!Tags.tagMap.has(tag)) {
                Tags.tagMap.set(tag, []);
            }
            Tags.tagMap.get(tag).push(this);
        });
    }
    _removeFromTagMap() {
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
    _updateTags(newTags) {
        this._removeFromTagMap();
        this.tags = newTags;
        this._addToTagMap();
    }
    /**
     * Returns all objects with the given tag.
     * @param tag tag to search for
     * @returns an array of Object with the given tag, access the tags or the obects here.
     */
    static getObjectsWithTag(tag) {
        return Tags.tagMap.get(tag)?.map((tag) => tag.object) ?? [];
    }
    getAll() {
        return this.tags.split(/\W+/g);
    }
    static hasTag(object, tag) {
        const tags = object.getComponent(Tags);
        if (tags) {
            return tags.hasTag(tag);
        }
        return false;
    }
    static getFirst(object) {
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
    static setTag(object, tag) {
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
__decorate([
    property.string()
], Tags.prototype, "tags", void 0);
