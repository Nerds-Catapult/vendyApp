

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



async function createBusiness(req, res) {
    const {name, phoneNumber, address, city, country, customerId} = req.body;
}