

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



async function createBusiness(req, res) {
    const { name, phoneNumber, address, city, country, } = req.body;
    const { customerId } = req.body || req.params

    if (!name || !phoneNumber || !address || !city || !country || !customerId) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const validName = await prisma.business.findUnique({ where: { name } });
    if (validName) {
        return res.status(400).json({ error: 'Business already exists, Please specify another name' });
    }
    const businessOwner = await prisma.customer.findUnique({ where: id });
    if (!businessOwner) {
        return res.status(400).json({ error: 'Business owner not found' });
    }
    const business = await prisma.business.create({
        data: {
            name,
            phoneNumber,
            address,
            city,
            country,
            customerId
        }
    })
    if (!business) {
        return res.status(400).json({ error: 'Business not created' });
    }
    res.status(201).json({
        businessName: business.name,
        businessAddress: business.address,
        businessCity: business.city,
        businessCountry: business.country,
        businessPhoneNumber: business.phoneNumber,
        businessOwner: businessOwner
    });
}

async function getABusiness(req, res) {
    const { id } = req.params;
    const decoded = jwt.verify(req.body.token || req.header('Authorization')?.replace('Bearer ', '')
        , process.env.JWT_SECRET || 'secret');
    const customerId = decoded.id;
    const customer = await prisma.customer.findUnique({ where: { id: customerId } });
    if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
    }
    const business = await prisma.business.findUnique({ where: { id } });
    if (!business) {
        return res.status(404).json({ error: 'Business not found' });
    }
    res.status(200).json({
        businessName: business.name,
        businessAddress: business.address,
        businessCity: business.city,
        businessCountry: business.country,
        businessPhoneNumber: business.phoneNumber,
        businessOwner: customer
    });
};


