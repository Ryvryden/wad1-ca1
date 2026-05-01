'use strict';

import { v4 as uuidv4 } from 'uuid';

import logger from '../utils/logger.js';
import felineStore from '../models/feline-store.js';
import accounts from './accounts.js';


const feline ={
    createView(request,response){
        const felineId = request.params.id;
        const loggedInUser = accounts.getCurrentUser(request);
        logger.debug(`Cats id = ${felineId}`);

        const viewData = {
            title: 'Feline',
            singleFeline: felineStore.getFeline(felineId),
            fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        };
        logger.info(viewData.singleFeline)
        response.render('feline', viewData);
    },


    addCat(request, response) {
        const felineId = request.params.id;
        const feline = felineStore.getFeline(felineId);
        const newCat = {
            id: uuidv4(),
            name: request.body.name,
            image: request.body.image,
        };
        felineStore.addCat(felineId, newCat, request.files.image, function(){
             response.redirect('/felines/' + felineId);
        });
    },

    deleteCat(request, response){
        const felineId = request.params.id;
        const catsId = request.params.catid;
        logger.debug(`Deleting Cat  $(catId} from Feline ${felineId}`);
        felineStore.removeCat(felineId, catsId, function() {
             response.redirect('/felines/'+ felineId);
        })
    }
};



export default feline;