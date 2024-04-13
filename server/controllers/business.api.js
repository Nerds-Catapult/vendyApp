const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const expressAsyncHandler = require('express-async-handler');



async function createBusiness(req, res) {
    try {
        const { businessName, phoneNumber, email, address, city, country } = req.body;
        console.log({"request":req.body})

        if (!areRequiredFieldsPresent(businessName, phoneNumber, email, address, city, country)) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const authorizationHeader = req.header('Authorization');
        if (!authorizationHeader) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const customerId = getCustomerIdFromAuthorization(authorizationHeader);
        if (!customerId) {
            return res.status(400).json({ message: 'Invalid authorization' });
        }

        const isValidCustomer = await checkCustomerValidity(customerId);
        if (!isValidCustomer) {
            return res.status(400).json({ message: 'Invalid customer' });
        }

        const businessExists = await checkIfBusinessExists(businessName);
        if (businessExists) {
            return res.status(400).json({ message: 'BusinessName already exists' });
        }

        const business = await createBusinessInDatabase({ businessName, phoneNumber, email, address, city, country, customerId });
        if (!business) {
            return res.status(400).json({ message: 'Failed to create business' });
        }

        const businessToken = generateBusinessToken(business.id, customerId);
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
    } catch (error) {
        console.error('Error creating business:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

function areRequiredFieldsPresent(businessName, phoneNumber, email, address, city, country) {
    return businessName && phoneNumber && email && address && city && country;
}

function getCustomerIdFromAuthorization(authorizationHeader) {
    try {
        const token = authorizationHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.id;
    } catch (error) {
        return null;
    }
}

async function checkCustomerValidity(customerId) {
    return prisma.customer.findFirst({
        where: {
            id: customerId
        }
    });
}
function checkIfBusinessExists(businessname) {
    return prisma.business.findFirst({
        where: {
            businessName: businessname
        }
    });
}
async function createBusinessInDatabase(data) {
    return prisma.business.create({
        data: {
            businessName: data.businessName,
            phoneNumber: data.phoneNumber,
            email: data.email,
            address: data.address,
            city: data.city,
            country: data.country,
            Customer: {
                connect: {
                    id: data.customerId
                }
            }
            // confirmed: data.confirmed, // Optional: set the default or passed value for confirmed
            //registered: data.registered // Optional: set the default or passed value for registered
        },
    });
}

function generateBusinessToken(businessId, customerId) {
    return jwt.sign({ businessId, customerId }, process.env.JWT_SECRET);
}

async function getBusinesses(req, res) {
    const decoded = jwt.verify(req.header('Authorization')?.replace('Bearer ', ''), process.env.JWT_SECRET);
    const customerId = decoded.id;
    const businesses = await prisma.business.findMany({
        where: {
            customerId
        }
    });
    if (!businesses) return res.status(400).json({ message: 'Failed to fetch businesses' });
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
    if (!business) return res.status(400).json({ message: 'Failed to fetch business' });
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
    if (!business) return res.status(400).json({ message: 'Failed to fetch business' });
    return res.status(200).json(business);
}

async function updateBusiness(req, res) {
    const decoded = jwt.verify(req.header('Authorization')?.replace('Bearer ', ''), process.env.JWT_SECRET);
    const customerId = decoded.id;
    const businessId = req.params.id;
    const { businessName, phoneNumber, email, address, city, country } = req.body;
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
    if (!business) return res.status(400).json({ message: 'Failed to update business' });
    return res.status(200).json({ message: 'Business updated successfully' });
}

module.exports = {
    createBusiness: expressAsyncHandler(createBusiness),
    getBusinesses: expressAsyncHandler(getBusinesses),
    getBusinessById: expressAsyncHandler(getBusinessById),
    getBusinessByToken: expressAsyncHandler(getBusinessByToken),
    updateBusiness: expressAsyncHandler(updateBusiness)
}