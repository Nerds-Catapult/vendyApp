const prismaClient = require('@prisma/client');
const asyncHandler = require('express-async-handler');
const { hashPassword, comparePassword, generateToken } = require('../utils/helpers');




//create customer;
async function createCustomer(req, res) {
    const { email, password, firstName, lastName, phone, address } = req.body;
    const hashedPassword = await hashPassword(password);
    const customer = await prismaClient.user.create({
        data: {
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phone,
            address,
        },
    });
    res.json({
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
        address: customer.address,
    });
}




module.exports = {
    createCustomer: asyncHandler(createCustomer),
}