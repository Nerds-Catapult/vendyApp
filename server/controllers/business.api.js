const jwt = require('jsonwebtoken');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const expressAsyncHandler = require('express-async-handler');


async function createBusiness(req, res) {
    const {businessName, phoneNumber, email, address, city, country} = req.body;
    if(!businessName || !phoneNumber || !email || !address || !city || !country) return res.status(400).json({message: 'All fields are required'});
    if(req.header('Authorization') === undefined|| null) return res.status(400).json({message: 'Unauthorized'});
    const decoded = jwt.verify(req.header('Authorization')?.replace('Bearer ', ''), process.env.JWT_SECRET);
    const customerId = decoded.id;
    const isValidCustomer = await prisma.customer.findFirst({
        where: {
            id: customerId
        }
    });

    if (!isValidCustomer) return res.status(400).json({message: 'Invalid customer'});
    const business = await prisma.business.create({
        data: {
            businessName,
            phoneNumber,
            email,
            address,
            city,
            country,
            customer: {
                connect: {
                    id: customerId
                }
            }
        }
    });
    if (!business) return res.status(400).json({message: 'Failed to create business'});
    const businessToken = jwt.sign({businessId: business?.id, customerId}, process.env.JWT_SECRET);
    return res.status(200).json({
        message: 'Business created successfully',
        businessId: business.id,
        businessName: business.businessName,
        phoneNumber: business.phoneNumber,
        email: business.email,
        address: business.address,
        city: business.city,
        country: business.country,
        businessToken: businessToken
    });
}

async function getBusinesses(req, res) {
    const decoded = jwt.verify(req.header('Authorization')?.replace('Bearer ', ''), process.env.JWT_SECRET);
    const customerId = decoded.id;
    const businesses = await prisma.business.findMany({
        where: {
            customerId
        }
    });
    if (!businesses) return res.status(400).json({message: 'Failed to fetch businesses'});
    return res.status(200).json(businesses);
}

async function getBusinessById(req, res) {
    const decoded = jwt.verify(req.header('Authorization')?.replace('Bearer ', ''), process.env.JWT_SECRET);
    const customerId = decoded.id;
    const businessId = req.params.id;
    const business = await prisma.business.findFirst({
        where: {
            id: businessId,
            customerId
        }
    });
    if (!business) return res.status(400).json({message: 'Failed to fetch business'});
    return res.status(200).json(business);
}

async function getBusinessByToken(req, res) {
    const decoded = jwt.verify(req.header('Authorization')?.replace('Bearer ', ''), process.env.JWT_SECRET);
    const customerId = decoded.id;
    const businessId = decoded.businessId;
    const business = await prisma.business.findFirst({
        where: {
            id: businessId,
            customerId
        }
    });
    if (!business) return res.status(400).json({message: 'Failed to fetch business'});
    return res.status(200).json(business);
}

async function updateBusiness(req, res) {
    const decoded = jwt.verify(req.header('Authorization')?.replace('Bearer ', ''), process.env.JWT_SECRET);
    const customerId = decoded.id;
    const businessId = req.params.id;
    const {businessName, phoneNumber, email, address, city, country} = req.body;
    const business = await prisma.business.update({
        where: {
            id: businessId
        },
        data: {
            businessName,
            phoneNumber,
            email,
            address,
            city,
            country
        }
    });
    if (!business) return res.status(400).json({message: 'Failed to update business'});
    return res.status(200).json({message: 'Business updated successfully'});
}

module.exports = {
    createBusiness: expressAsyncHandler(createBusiness),
    getBusinesses: expressAsyncHandler(getBusinesses),
    getBusinessById: expressAsyncHandler(getBusinessById),
    getBusinessByToken: expressAsyncHandler(getBusinessByToken),
    updateBusiness: expressAsyncHandler(updateBusiness)
}