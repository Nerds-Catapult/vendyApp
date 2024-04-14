

import express from 'express';
import protectRoutes from '../middlewares/authMiddleware';
import { createBusiness } from '../controllers/business.api';
import { createCustomer, getACustomer , getACustomerByToken} from '../controllers/customers.api';
import { createBusinessAdmin, getBusinessAdmin } from '../controllers/admins.api';


export default (router: express.Router) => {
    router.post('/create-customer', createCustomer);
    router.get('/get-customer/:id', protectRoutes, getACustomer);
    router.get('/get-customer-by-token', getACustomerByToken);

    router.post('/create-business-admin', createBusinessAdmin);
    router.get('/get-business-admin/:id', protectRoutes, getBusinessAdmin);



    router.post('/create-business', createBusiness);
    return router;
}