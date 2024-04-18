

import express from 'express';
import protectRoutes from '../middlewares/authMiddleware';
import { createBusiness, getBusiness } from '../controllers/business.api';
import {protectBusinessRoutes} from "../middlewares/business.guards";
import { createCustomer, getACustomer , getACustomerByToken, loginCustomer} from '../controllers/customers.api';
import { createBusinessAdmin, getBusinessAdmin, loginBusinessAdmin } from '../controllers/admins.api';

import {middlewareUploads} from "../middlewares/uploads.cloudinary";


export default async (router: express.Router) => {
    router.post('/create-customer', (await middlewareUploads('vendy')).array('image'), createCustomer);
    router.post('/login-customer', loginCustomer);
    router.get('/get-customer/:id', protectRoutes, getACustomer);
    router.get('/get-customer-by-token', getACustomerByToken);

    router.post('/create-business-admin',  createBusinessAdmin);
    router.post('/login-business-admin', loginBusinessAdmin);
    router.get('/get-business-admin/:id', protectRoutes, getBusinessAdmin);



    router.post('/create-business',  createBusiness);
    return router;
}