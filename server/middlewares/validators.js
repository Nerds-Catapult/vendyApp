import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function parseBusinessWithOwner(customerId, businessId) {
    const business = await prisma.business.findUnique({ where: { id: businessId } });
    if (!business) {
        return res.status(404).json({ error: 'Business not found' });
    }
    const businessOwner = await prisma.customer.findUnique({ where: { id: customerId } });
    if (!businessOwner) {
        return res.status(400).json({ error: 'Business owner not found' });
    }
    return { business, businessOwner };
}


module.exports = { parseBusinessWithOwner };