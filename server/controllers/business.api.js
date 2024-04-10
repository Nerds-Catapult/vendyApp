const jwt = require('jsonwebtoken');
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
    const token = jwt.sign({ id: business.id }, process.env.JWT_SECRET
        || 'secret', { expiresIn: '1d' });
    res.status(201).json({
        businessName: business.name,
        businessAddress: business.address,
        businessCity: business.city,
        businessCountry: business.country,
        businessPhoneNumber: business.phoneNumber,
        businessOwner: businessOwner,
        token: token
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


async function getBusinesses(req, res) {
    const businesses = await prisma.business.findMany();
    if (!businesses) {
        return res.status(404).json({ error: 'Businesses not found' });
    }
    res.status(200).json(businesses);
}



async function updateBusiness(req, res) {
    const { id } = req.params;
    const { name, phoneNumber, address, city, country } = req.body;
    if (!name || !phoneNumber || !address || !city || !country) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const business = await prisma.business.update({
        where: { id: parseInt(id) },
        data: {
            name,
            phoneNumber,
            address,
            city,
            country
        }
    });
    if (!business) {
        return res.status(400).json({ error: 'Business not updated' });
    }
    res.status(200).json({
        businessName: business.name,
        businessAddress: business.address,
        businessCity: business.city,
        businessCountry: business.country,
        businessPhoneNumber: business.phoneNumber
    });
}




async function createStore(req, res) {
    const{name, phoneNumber, address, city, country, customerid, businessid, storeSlug} = req.body;
    if(!name || !phoneNumber || !address || !city || !country || !customerid || !businessid || !storeSlug){
        return res.status(400).json({error: 'All fields are required'});
    }
    try {
        const isValidCustomer = await prisma.customer.findUnique({ where: { id: customerid } });
        const isValidBusiness = await prisma.business.findUnique({ where: { id: businessid } });
        if (!isValidCustomer || !isValidBusiness) {
            return res.status(404).json({ error: 'Customer or Business not found' });
        }
        const business = await prisma.store.create({
            data: {
                name,
                phoneNumber,
                address,
                city,
                country,
                customerid,
                businessid,
                storeSlug
            }
        })
        if (business) {
            return res.status(201).json({
                storeName: business.name,
                storeAddress: business.address,
                storeCity: business.city,
                storeCountry: business.country,
                storePhoneNumber: business.phoneNumber
            });
        }
    } catch (error) {
        return res.status(400).json({ error: 'something went wrong' });
    }
}