'use strict';

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
};

export default feline;