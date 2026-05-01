'use strict';

import express from 'express';
import logger from "./utils/logger.js";
const router = express.Router();



import feline from './controllers/feline.js';
import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import stats from './controllers/stats.js';
import accounts from './controllers/accounts.js';



router.get('/start', start.createView);

router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
router.get('/felines/:id',feline.createView);

router.post('/dashboard/addfeline', dashboard.addFeline);
router.get('/dashboard/deletefeline/:id', dashboard.deleteFeline);

router.post('/feline/:id/addCat', feline.addCat);
router.get('/feline/:id/deletecat/:catid', feline.deleteCat);
router.get('/stats', stats.createView);
router.get('/searchCategory', dashboard.createView);
router.get('/sortData', dashboard.createView);

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);






router.get('/error', (request, response) => response.status(404).end('Page not found.'));

export default router;
