'use strict';

import logger from "../utils/logger.js";
import felineStore from '../models/feline-store.js';

const dashboard = {
    createView(request, response){
        logger.info("Dashboard page loading!");

        const viewData ={
            title: "Cat App Dashboard",
            felines: felineStore.getAllFelines()
        };

        logger.debug(viewData.felines);
        response.render('dashboard',viewData);
    },
};

export default dashboard;