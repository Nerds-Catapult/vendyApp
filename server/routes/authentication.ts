

import express from 'express';

import { createBusiness } from '../controllers/business.api';
import { createCustomer } from '../controllers/customers.api';



export default (router: express.Router) => {
    router.post('/create-customer', createCustomer);
    router.post('/create-business', createBusiness);
    return router;
}