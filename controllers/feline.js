'use strict';

import { v4 as uuidv4 } from 'uuid';

import logger from '../utils/logger.js';
import felineStore from '../models/feline-store.js';

const feline ={
    createView(request,response){
        const felineId = request.params.id;
        logger.debug(`Cats id = ${felineId}`);

        const viewData = {
            title: 'Feline',
            singleFeline: felineStore.getFeline(felineId)
        };

        response.render('feline', viewData);
    },
    addCat(request, response) {
        const felineId = request.params.id;
        const feline = felineStore.getFeline(felineId);
        const newCat = {
            id: uuidv4(),
            name: request.body.name,
        };
        felineStore.addCat(felineId, newCat);
        response.redirect('/feline/' + felineId);
    },
    deleteCat(request, response){
        const felineId = request.params.id;
        const catsId = request.params.id;
        logger.debug(`Deleting Cat  $(catId} from Feline ${playlistId}`);
        felineStore.removeCat(felineId, catsId);
        response.redirect('/feline'+ felineId);
    }
};



export default feline;