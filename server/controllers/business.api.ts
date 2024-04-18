import jwt, {JwtPayload} from 'jsonwebtoken';
import {PrismaClient} from '@prisma/client';
import {Request, Response} from 'express';

const prisma = new PrismaClient();

interface jwtPayload extends JwtPayload {
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
}


export const createBusiness = async (req: Request, res: Response) => {
    const {name, phoneNumber, email, address, city, country,}: ExpectedBusinessRequest = req.body;
    if (!name || !phoneNumber || !email || !address || !city || !country) {
        return res.status(400).json("empty fields")
    }
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as jwtPayload;

        if (decoded.role !== 'BUSINESS_ADMIN') {
            return res.status(401).json({error: 'insufficient permission'});
        }
        const imageUrl = req.file;
        if (!imageUrl) {
            return res.status(500).json("image string not found")
        }
        const business = await prisma.business.create({
            data: {
                name,
                phoneNumber,
                email,
                address,
                city,
                country,
                Image: {
                    create: {
                        fileName: "avatar",
                        //@ts-ignore
                        imageUrl: imageUrl
                    }
                }
            }
        });
        if (!business) {
            return res.status(400).json("failed to create business");
        }
        return res.status(200).json({
            name: business.name,
            phoneNumber: business.phoneNumber,
            email: business.email,
            address: business.address,
            city: business.city,
            avatar: business.image
        })
    } catch (error) {
        return res.status(500).json("something went wrong")
    }
};


export const getBusiness = async (req: Request, res: Response) => {
    const {id} = req.params;
    if (!id) {
        return res.status(404).json("empty fields")
    }
    const business = await prisma.business.findUnique({
        where: {id: Number(id)},
        include: {
            admins: {
                select: {
                    id: true,
                    email: true,
                    name: true
                }
            },
            Image: {
                select: {
                    id: true,
                    fileName: true,
                    imageUrl: true,
                }
            },
            stores: {
                select: {
                    id: true,
                    name: true,
                    phoneNumber: true,
                    address: true,
                    location: true,
                    slug: true
                }
            }
        }
    });
    if (business) {
        return res.status(404).json("no business found")
    }
    return res.status(200).json({
        businessName: business.name,
        businessEmail: business.email,
        businessNumber: business.phoneNumber,
        businessAddress: business.address,
        businessCity: business.city,
        businessCountry: business.country
    })
}