

import { Router } from 'express';
import { createCustomer, customerLogin, getACustomer, getACustomerByToken } from '../controllers/customers.api';
// import { createBusiness, } from '../controllers/business.api';
// import protectRoutes from '../middlewares/authMiddleware';


const router = Router();

router.post('/create-customer', createCustomer);
router.post('/customer-login', customerLogin);
// router.get('/get-customer/:id', protectRoutes, getACustomer);
router.get('/getByToken',  getACustomerByToken);


// router.post('/create-business', protectRoutes, createBusiness);
// router.get('/get-business/:id', protectRoutes, getBusinessWithCustomerDetails);
// router.post('/register-store/:businessId', protectRoutes, registerStore);


module.exports = router;