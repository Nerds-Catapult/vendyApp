//router


const { Router } = require('express');
const { createCustomer } = require('../controllers/users');



const router = Router();

router.post('/create-customer', createCustomer);


module.exports = router;