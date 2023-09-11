import { Component } from '@wonderlandengine/api';
export declare class Tags extends Component {
    static TypeName: string;
    tags: string;
    /**
     * @param {string} tag the tag to test
     */
    hasTag(tag: string): boolean;
}
