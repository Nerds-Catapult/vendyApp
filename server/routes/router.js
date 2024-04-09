//router


const { Router } = require('express');
const { createCustomer, customerLogin, getACustomer } = require('../controllers/customers');
const protectRoutes= require('../middlewares/authMiddleware');



const router = Router();

router.post('/create-customer', createCustomer);
router.post('/customer-login', customerLogin);
router.get('/get-customer/:id',protectRoutes, getACustomer);


module.exports = router;