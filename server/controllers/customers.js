const prismaClient = require('@prisma/client');
const asyncHandler = require('express-async-handler');
const { hashPassword, comparePassword, generateToken } = require('../utils/helpers');




//create customer;
async function createCustomer(req, res) {
    const { email, password, firstName, lastName, phone, address } = req.body;
    if (!email || !password || !firstName || !lastName || !phone || !address) {
        res.status(400);
        throw new Error('All fields are required');
    }
    const checkCustomer = await prismaClient.customer.findUnique({
        where: {
            email,
        },
    });
    if (checkCustomer) {
        res.status(400);
        throw new Error('Customer already exists');
    }
    const hashedPassword = await hashPassword(password);
    const customer = await prismaClient.customer.create({
        data: {
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phone,
            address,
        },
    });
    const token = generateToken(customer.id);
    res.status(201).json({
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
        address: customer.address,
        token: token,
    });
}


module.exports = {
    createCustomer: asyncHandler(createCustomer),
}