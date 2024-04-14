import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
const prisma = new PrismaClient();
import { hashPassword, comparePassword, generateToken } from "../utils/helpers";

export const createBusinessAdmin = async (req: Request, res: Response) => {
  const { name, email, phone, password } = req.body;
  try {
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const isExisting = await prisma.businessAdmin.findUnique({
      where: { email },
    });
    if (isExisting) {
      return res.status(400).json({ error: "Admin already exists" });
    }
    const hashedPassword = await hashPassword(password);
    const admin = await prisma.businessAdmin.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
      },
    });
    const token = await generateToken({ id: admin.id, role: admin.role });
    const adminResponse = {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      role: admin.role,
      token: token,
    };
    return res.status(201).json(adminResponse);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const getBusinessAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const admin = await prisma.businessAdmin.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        password: false,
        businesses: {
          select: {
            id: true,
            name: true,
            address: true,
            phoneNumber: true,
            email: true,
          },
        },
        stores: {
          select: {
            id: true,
            name: true,
            phoneNumber: true,
            address: true,
            location: true,
            country: true,
            slug: true,
          },
        },
      },
    });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    return res.status(200).json(admin);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
