//router


const { Router } = require('express');
const { createCustomer, customerLogin } = require('../controllers/customers');




const router = Router();

router.post('/create-customer', createCustomer);
router.post('/customer-login', customerLogin);


module.exports = router;