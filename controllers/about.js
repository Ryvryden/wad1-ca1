'use strict';
import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import accounts from './accounts.js';



const about = {
    createView(request, response){
        const loggedInUser = accounts.getCurrentUser(request);
        logger.info("about page loading!");

        if(loggedInUser){
        const viewData ={
            title:"About title",
            fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
            info: appStore.getAppInfo()
            
        };
        response.render('about', viewData);
    }
    else response.render('about', viewData);
},
    
};

export default about;