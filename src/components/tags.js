import {Component} from '@wonderlandengine/api';

export class Tags extends Component {
    static TypeName = 'tags';
    static Properties = {
        tags: {type: WL.Type.String},
    }

    /**
     * @param {string} tag the tag to test
     */
    hasTag(tag){
        const tags = this.tags.split(/\W+/g);   
        return !!~tags.indexOf(tag);
    }

};
