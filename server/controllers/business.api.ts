import jwt, { JwtPayload } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

interface BusinessData {
  businessName: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  country: string;
  imageUrl: string;
  adminEmail: string;
}

interface BusinessResponse {
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  avatar: string;
}

export const createBusiness = async (req: Request, res: Response) => {
  const { businessName, phoneNumber, email, address, city, country, imageUrl, adminEmail } = req.body as BusinessData;

  if (!businessName || !phoneNumber || !email || !address || !city || !country || !imageUrl || !adminEmail) {
    return res.status(400).json({ error: 'All fields are required', status: 400 });
  }

  try {
    const admin = await prisma.businessAdmin.findUnique({ where: { email: adminEmail } });

    if (!admin) {
      return res.status(400).json({ error: 'Admin not found', status: 400 });
    }

    if (admin.role !== 'BUSINESS_ADMIN') {
      return res.status(400).json({ error: 'Unauthorized', status: 400 });
    }

    const business = await prisma.business.create({
      data: {
        name: businessName,
        phoneNumber,
        email,
        address,
        city,
        country,
        Image: {
          create: {
            fileName: 'avatar',
            imageUrl: imageUrl,
          },
        },
        admins: {
          connect: { id: admin.id },
        },
      },
    });

    const businessResponse: BusinessResponse = {
      name: business.name,
      phoneNumber: business.phoneNumber,
      email: business.email,
      address: business.address,
      city: business.city,
      avatar: business.image
    };

    return res.status(200).json(businessResponse);
  } catch (error) {
    console.log(error);
    return res.status(500).json('Something went wrong');
  }
};

export const getBusiness = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json('Empty fields');
  }

  const business = await prisma.business.findUnique({
    where: { id: Number(id) },
    include: {
      admins: { select: { id: true, email: true, name: true } },
      Image: { select: { id: true, fileName: true, imageUrl: true } },
      stores: {
        select: {
          id: true,
          name: true,
          phoneNumber: true,
          address: true,
          location: true,
          slug: true,
        },
      },
    },
  });

  if (!business) {
    return res.status(404).json('No business found');
  }

  const businessResponse = {
    businessName: business.name,
    businessEmail: business.email,
    businessNumber: business.phoneNumber,
    businessAddress: business.address,
    businessCity: business.city,
    businessCountry: business.country,
  };

  return res.status(200).json(businessResponse);
};