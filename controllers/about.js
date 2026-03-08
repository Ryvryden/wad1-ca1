'use strict';
import logger from "../utils/logger.js";

const about = {
    createView(request, response){
        logger.info("about page loading!");

        const viewData ={
            title:"About title",
        };
        response.render('about', viewData);
    },
};

export default about;