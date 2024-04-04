const prismaClient = require('@prisma/client');
const asyncHandler = require('express-async-handler');
const { hashPassword, comparePassword, generateToken } = require('../utils/helpers');




//create customer;

export async function createUser(req, res) {
    const { email, password, firstName, lastName, phone, address } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await prismaClient.user.create({
        data: {
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phone,
            address,
        },
    });
    res.json(user);
}