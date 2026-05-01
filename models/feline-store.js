'use strict';
import feline from '../controllers/feline.js';
import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const felineStore = {
    store: new JsonStore('./models/feline-store.json',{felineCollection: []}),
    collection: 'felineCollection',
    array: 'cats',

    getUserFelines(userid){
        return this.store.findBy(this.collection, (feline => feline.userid === userid));
    },
    searchUserFelines(search, userid){
        return this.store.findBy(this.collection, (feline => feline.userid === userid && feline.groupName.toLowerCase().includes(search.toLowerCase())))
    },


    getAllFelines(){
        return this.store.findAll(this.collection);
    },
    getFeline(id){
        return this.store.findOneBy(this.collection, (feline => feline.id === id));
    },
    addFeline(feline){
        this.store.addCollection(this.collection, feline);
    },
    removeFeline(id){
        const feline = this.getFeline(id);
        this.store.removeCollection(this.collection, feline);
    },

    async addCat(id, cat,file,response){
        try{
            cat.image = await this.store.addToCloudinary(file);
            this.store.addItem(this.collection, id, this.array, cat);
            response();
        }
        catch(error){
            logger.error("Error processing cat:",error);
            response(error);
        }
    },
    //addCat(id, cat) {
   //     this.store.addItem(this.collection, id, this.array, cat);
   // },

   async removeCat(id,catId,response){
    const feline = this.getFeline(id);
   
    const cat = feline.cats.find(x => x.id == catId);
   
    if(cat.image && cat.image.public_id){
        try{
            logger.info(cat.image.public_id)
            await this.store.deleteFromCloudinary(cat.image.public_id);
            logger.info("Cloudinary image deleted");
          
         
        }catch(err){
            logger.error("Failed to delete image: ",err);
            
        }
    }
      this.store.removeItem(this.collection,id ,this.array,catId );
      response();

   },
   

   
    //removeCat(id, catId){
     //   this.store.removeItem(this.collection,id, this.array, catId);
    //},
    searchFeline(search){
        return this.store.findBy(
            this.collection,
            (feline => feline.groupName.toLowerCase().includes(search.toLowerCase())))
    },

};

export default felineStore;