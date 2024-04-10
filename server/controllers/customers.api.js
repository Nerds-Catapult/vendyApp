const { PrismaClient } = require('@prisma/client');
const { hashPassword, comparePassword, generateToken } = require('../utils/helpers');
const jwt = require('jsonwebtoken');


const prisma = new PrismaClient();

async function createCustomer(req, res) {
    const { firstName, lastName, email, password, address, phone, role } = req.body;

    if (!firstName || !lastName || !email || !password || !address || !phone || !role) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const existingCustomer = await prisma.customer.findUnique({ where: { email } });
    if (existingCustomer) {
        return res.status(400).json({ error: 'Customer already exists' });
    }

    const hashedPassword = await hashPassword(password);
    const customer = await prisma.customer.create({
        data: { email, password: hashedPassword, firstName, lastName, phone, address },
    });

    const token = generateToken({ id: customer.id, role: customer.role });
    const customerResponse = {
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
        address: customer.address,
        role: customer.role,
        token,
    };

    res.status(201).json(customerResponse);
}

async function customerLogin(req, res) {
    console.log(req.body)
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const customer = await prisma.customer.findUnique({ where: { email } });
    if (!customer) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await comparePassword(password, customer.password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = generateToken({ id: customer.id, role: customer.role });
    const customerResponse = {
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
        address: customer.address,
        token,
    };

    res.status(200).json(customerResponse);
}


async function getACustomer(req, res) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Customer ID is required' });
    }
    const customerId = parseInt(id);
    const customer = await prisma.customer.findUnique({ where: { id: customerId } });
    if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json(customer);
}

async function getACustomerByToken(req, res) {
    const decoded = jwt.verify(req.body.token || req.header('Authorization')?.replace('Bearer ', '')
        , process.env.JWT_SECRET || 'secret');
    const id = decoded.id;
    if (!id) {
        return res.status(400).json({ error: 'Customer ID is required' });
    }
    const customerId = parseInt(id);
    const customer = await prisma.customer.findUnique({ where: { id: customerId } });
    if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json({
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
        address: customer.address,
        role: customer.role,
        orders: customer.orders || 0,
    });
}


async function updateCustomer(req, res) {
    const { id } = req.params;
    const { firstName, lastName, email, password, address, phone, role } = req.body;
    if (!firstName || !lastName || !email || !password || !address || !phone || !role) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const hashedPassword = await hashPassword(password);
    const customer = await prisma.customer.update({
        where: { id: parseInt(id) },
        data: {
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phone,
            address,
            role
        }
    });
    if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json(customer);
}




module.exports = {
    createCustomer,
    customerLogin,
    getACustomer,
    getACustomerByToken,
    updateCustomer
};