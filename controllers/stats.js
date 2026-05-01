"use strict";

import logger from "../utils/logger.js";
import felineStore from "../models/feline-store.js";
import accounts from "./accounts.js";

const stats = {
    createView(request, response){
        const loggedInUser = accounts.getCurrentUser(request);

        if(loggedInUser){
        logger.info("Stats page loading!");

        const feline = felineStore.getAllFelines();

        let numFeline = feline.length;

        let numCats = feline.reduce((total,feline) =>total+feline.cats.length, 0);
        
            let average = numFeline > 0 ? (numCats / numFeline).toFixed(2) : 0;

        const statistics = {
            displayNumFeline: numFeline,
            displayNumCats: numCats,
                displayAverage: average
            
        }

        const viewData = {
            title: "Feline app Statistics",
            stats: statistics,
            fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName
        };
        response.render("stats",viewData);
    }
    else response.redirect('/');
},


};
export default stats;