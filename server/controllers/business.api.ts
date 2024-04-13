import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import {Request, Response } from 'express'


export const createBusiness = async (req:Request, res:Response) => {
    const { businessName, phoneNumber, email, address, city, country } = req.body;
    
    // Validate request fields
    if (!businessName || !phoneNumber || !email || !address || !city || !country) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Validate Authorization header and extract customer ID
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: Missing or invalid token" });
    }
    
    let customerId;
    try {
        const token = authorizationHeader.replace("Bearer ", "");
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        customerId = decodedToken?.id;
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // Create a new business
    try {
        const businessNameTaken = await prisma.business.findUnique({
            where: {businessName}
        })
        if (businessNameTaken) {
            return res.status(400).json({"error": "business name taken"})
        }
        const existingBusiness = await prisma.business.findFirst({
            where: {
                customerId
            }
        });
        if (existingBusiness) {
            return res.status(400).json({"message":"business already exists for this customer"})
        }

        const business = await prisma.business.create({
            data: {
                businessName,
                phoneNumber,
                email,
                address,
                city,
                country,
                Customer: {
                    connect: {
                        id: customerId
                    }
                }
            }
        });
        const businessToken = jwt.sign({ businessid: business.id, custmerId: customerId }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Return the created business
        console.log("database created succesfully")
        return res.status(201).json({
            businessToken: businessToken,
            businessName: business.businessName,
            phoneNumber: business.phoneNumber,
            email: business.email,
            address: business.address,
            city: business.city,
            country: business.country,
        });
    } catch (error) {
        console.error("Error creating business:", error);
        return res.status(500).json({ error: "Failed to create business" });
    }
}
