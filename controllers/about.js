'use strict';
import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";

const about = {
    createView(request, response){
        logger.info("about page loading!");

        const viewData ={
            title:"About title",
            info: appStore.getAppInfo()
            
        };
        response.render('about', viewData);
    },
};

export default about;