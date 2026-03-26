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
    addCat(id, cat) {
        this.store.addItem(this.collection, id, this.array, cat);
    },
    removeCat(id, catId){
        this.store.removeItem(this.collection,id, this.array, catId);
    },

};

export default felineStore;