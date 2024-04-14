import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';


const Prisma = new PrismaClient();

interface jwtPayload {
  id: number;
  role: string;
}

const protectRoutes = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Not authorized, no token found' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as jwtPayload;
    let user;
    switch (decoded.role) {
      case 'ADMIN':
        user = await Prisma.admin.findUnique({ where: { id: decoded.id } });
        break;
      case 'CUSTOMER':
        user = await Prisma.customer.findUnique({ where: { id: decoded.id } });
        break;
      // case 'VENDOR':
      //   user = await Prisma.vendor.findUnique({ where: { id: decoded.id } });
      //   break;
      default:
        return res.status(404).json({ error: 'User not found' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Not authorized, token failed' });
  }
};

module.exports = protectRoutes;