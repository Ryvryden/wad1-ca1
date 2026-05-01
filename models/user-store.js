'use strict';


import logger from '../utils/logger.js';
import JsonStore from './json-store.js';
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

import dotenv from "dotenv";

dotenv.config({ quiet: true });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const userStore = {
    
    store: new JsonStore('./models/user-store.json', {user: [] }),
    collection: 'users',

    getAllUsers(){
        return this.store.findAll(this.collection);
    },
    getUserById(id){
        return this.store.findOneBy(this.collection,(user=> user.id === id));
    },
    getUserByEmail(email){
        return this.store.findOneBy(this.collection, (user => user.email === email));
    },
    addUser(user){
        this.store.addCollection(this.collection, user);
    },

};
export default userStore;