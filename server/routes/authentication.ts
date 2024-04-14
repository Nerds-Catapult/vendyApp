

import express from 'express';
import protectRoutes from '../middlewares/authMiddleware';
import { createBusiness } from '../controllers/business.api';
import { createCustomer, getACustomer , getACustomerByToken, loginCustomer} from '../controllers/customers.api';
import { createBusinessAdmin, getBusinessAdmin, loginBusinessAdmin } from '../controllers/admins.api';


export default (router: express.Router) => {
    router.post('/create-customer', createCustomer);
    router.post('/login-customer', loginCustomer);
    router.get('/get-customer/:id', protectRoutes, getACustomer);
    router.get('/get-customer-by-token', getACustomerByToken);

    router.post('/create-business-admin', createBusinessAdmin);
    router.post('/login-business-admin', loginBusinessAdmin);
    router.get('/get-business-admin/:id', protectRoutes, getBusinessAdmin);



    router.post('/create-business', createBusiness);
    return router;
}