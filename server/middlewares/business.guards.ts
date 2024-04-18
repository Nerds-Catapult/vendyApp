import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";



const prisma = new PrismaClient();



interface JwtPayload {
  id: number;
  role: string;
}

interface AuthenticatedRequest extends Request {
  admin?: any;
}


export const protectBusinessRoutes = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {

    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({error: "Not authorized, no token found"});
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as JwtPayload;
        let admin;
        if (decoded.role !== "BUSINESS_ADMIN") {
            return res.status(401).json({error: "Not authorized, token failed"});
        }
        admin = await prisma.businessAdmin.findUnique({where: {id: decoded.id}});
        if (!admin) {
            return res.status(404).json({error: "Admin not found"});
        }
        req.admin = admin;
        next();
    }catch (error) {
        return res.status(401).json({error: "Not authorized, token failed"});
    }
}