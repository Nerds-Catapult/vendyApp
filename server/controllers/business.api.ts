import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import * as fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

interface JwtPayload {
    id: number;
    role: string;
}

interface ExpectedBusinessRequest {
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
    city: string;
    country: string;
    image?: string | any;
}

export const createBusiness = async (req: Request, res: Response) => {
    const { name, phoneNumber, email, address, city, country, image }: ExpectedBusinessRequest = req.body;

    // Validate request data
    if (!name || !phoneNumber || !email || !address || !city || !country) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    try {
        // Get and verify the token
        const tokenIdentifier = req.header('Authorization')?.replace('Bearer ', '');
        if (!tokenIdentifier) {
            return res.status(401).json({ error: 'Not authorized, no token found' });
        }
        const decoded = jwt.verify(tokenIdentifier, process.env.JWT_SECRET || 'secret') as JwtPayload;
        if (decoded.role !== 'BUSINESS_ADMIN') {
            return res.status(401).json({ error: 'Not authorized, token failed' });
        }

        // Find the business admin
        const businessAdmin = await prisma.businessAdmin.findUnique({
            where: { id: decoded.id },
        });
        if (!businessAdmin) {
            return res.status(404).json({ error: 'Business Admin not found' });
        }

        // Handle image file if provided
        let imageData = null;
        if (image) {
            // Ensure the image file path is valid and exists
            if (!fs.existsSync(image)) {
                return res.status(400).json({ error: 'Image file not found' });
            }
            imageData = fs.readFileSync(image);
        }

        // Create a new business with the image data (if provided)
        const business = await prisma.business.create({
            data: {
                name,
                phoneNumber,
                email,
                address,
                city,
                country,
                admins: {
                    connect: {
                        id: businessAdmin.id,
                    },
                },
                ...(imageData && {
                    Image: {
                        create: {
                            fileName: path.basename(image),
                            imageData,
                        },
                    },
                }),
            },
        });

        // Respond with the created business object
        return res.status(201).json(business);
    } catch (error) {
        console.error('Error creating business:', error);
        return res.status(500).json({ error: 'Something went wrong' });
    } finally {
        // Disconnect Prisma Client when the request is complete
        await prisma.$disconnect();
    }
};


export const getBusiness = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const business = await prisma.business.findUnique({
            where: { id: Number(id) },
            select: {
                id: true,
                name: true,
                phoneNumber: true,
                email: true,
                address: true,
                city: true,
                country: true,
                Image: {
                    select: {
                        fileName: true,
                    },
                },
            },
        });

        // Respond with the business object
        return res.status(200).json(business);
    } catch (error) {
        console.error('Error fetching business:', error);
        return res.status(500).json({ error: 'Something went wrong' });
    } finally {
        // Disconnect Prisma Client when the request is complete
        await prisma.$disconnect();
    }
};