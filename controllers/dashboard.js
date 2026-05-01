'use strict';

import logger from "../utils/logger.js";
import felineStore from '../models/feline-store.js';
import accounts from './accounts.js';
import { v4 as uuidv4 } from 'uuid';
import feline from "./feline.js";




const dashboard = {
    createView(request, response){
        logger.info("Dashboard page loading!");


        const loggedInUser = accounts.getCurrentUser(request);

        if(loggedInUser){
            const searchTerm = request.query.searchTerm || "";
            
            const felines = searchTerm
                ? felineStore.searchUserFelines(searchTerm, loggedInUser.id)
                : felineStore.getUserFelines(loggedInUser.id);
            
            const sortField = request.query.sort;
            const order = request.query.order === "desc" ? -1 : 1; 
            
            let sorted = felines;

            if(sortField){
                sorted = felines.slice().sort((a,b) => {
                    if (sortField === "groupName"){
                        return a.groupName.localeCompare(b.groupName) * order;
                    }
                return 0;
                });
            }
        

        const viewData ={
            title: "Cat App Dashboard",
            fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
            felines : sortField ? sorted : felines,
            search : searchTerm,
            groupNameSelected: request.query.sort === "groupName",
            ascSelected: request.query.order === "asc",
            descSelected: request.query.order === "desc",
        };

        logger.info('about to render'+viewData.felines);

        response.render('dashboard',viewData);
    }
    else response.redirect('/');
},
    addFeline(request,response){
            const loggedInUser = accounts.getCurrentUser(request);
            logger.debug(loggedInUser.id);
            const timestamp = new Date();

            const newFeline = {
                userid : loggedInUser.id,
                id: uuidv4(),
                groupName: request.body.groupName,
                cats: [],
                date: timestamp
            };
            felineStore.addFeline(newFeline);
            response.redirect('/dashboard');
        },
        deleteFeline(request,response){
            const felineId = request.params.id;
            logger.debug(`Deleting Feline ${felineId}`);
            felineStore.removeFeline(felineId);
            response.redirect("/dashboard");
        },

       

};

export default dashboard;