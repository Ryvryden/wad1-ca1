'use strict';
import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const felineStore = {
    store: new JsonStore('./models/feline-store.json',{felineCollection: []}),
    collection: 'felineCollection',
    array: 'cats',

    getAllFelines(){
        return this.store.findAll(this.collection);
    },
    getFeline(id){
        return this.store.findOneBy(this.collection, (feline => feline.id === id));
    },

};

export default felineStore;