const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const Prisma = new PrismaClient();

const protectRoutes = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Not authorized, no token found' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    let user;
    console.log(decoded)
    switch (decoded.role) {
      case 'ADMIN':
        user = await Prisma.admin.findUnique({ where: { id: decoded.id } });
        break;
      case 'CUSTOMER':
        user = await Prisma.customer.findUnique({ where: { id: decoded.id } });
        break;
      case 'VENDOR':
        user = await Prisma.vendor.findUnique({ where: { id: decoded.id } });
        break;
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