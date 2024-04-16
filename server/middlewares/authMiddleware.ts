import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

interface JwtPayload {
  id: number;
  role: string;
}

interface AuthenticatedRequest extends Request {
  user?: any;
}

const protectRoutes = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "Not authorized, no token found" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret"
    ) as JwtPayload;
    let user;
    switch (decoded.role) {
      case "OVERALL_ADMIN":
        user = await prisma.admin.findUnique({ where: { id: decoded.id } });
        break;
      case "CUSTOMER":
        user = await prisma.customer.findUnique({ where: { id: decoded.id } });
        break;
      case "BUSINESS_ADMIN":
        user = await prisma.businessAdmin.findUnique({
          where: { id: decoded.id },
        });
        break;
      default:
        return res.status(404).json({ error: "User not found" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Not authorized, token failed" });
  }
};

export default protectRoutes;
