import {Component } from '@wonderlandengine/api';
import { property } from "@wonderlandengine/api/decorators.js";

export class Tags extends Component {
    static TypeName = 'tags';

    @property.string()
    tags!:string;

    /**
     * @param {string} tag the tag to test
     */
    hasTag(tag:string){
        const tags = this.tags.split(/\W+/g);   
        return !!~tags.indexOf(tag);
    }

};
