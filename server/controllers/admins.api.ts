import {PrismaClient} from "@prisma/client";
import {Request, Response} from "express";
import {comparePassword, generateToken, hashPassword} from "../utils/helpers";

const prisma = new PrismaClient();


export const createBusinessAdmin = async (req: Request, res: Response) => {
    const {name, email, phone, password} = req.body;
    try {
        if (!name || !email || !phone || !password) {
            return res.status(400).json({error: "All fields are required"});
        }
        const isExisting = await prisma.businessAdmin.findUnique({
            where: {email},
        });
        if (isExisting) {
            return res.status(400).json({error: "Admin already exists"});
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
        if (!admin) {
            return res.status(400).json({error: "Failed to create admin"});
        }
        const token = await generateToken({id: admin.id, role: admin.role});
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
        return res.status(500).json({error: "Something went wrong"});
    }
};


export const getBusinessAdmin = async (req: Request, res: Response) => {
    const {id} = req.params;
    if (!id) {
        return res.status(404).json("Empty fields");
    }
    try {
        const admin = await prisma.businessAdmin.findUnique({
            where: {id: Number(id)},
        });
        if (!admin) {
            return res.status(404).json({error: "Admin not found"});
        }
        return res.status(200).json(admin);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong"});
    }
};



export const updateBusinessAdmin = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {name, email, phone} = req.body;
    try {
        const admin = await prisma.businessAdmin.update({
            where: {id: Number(id)},
            data: {
                name,
                email,
                phone,
            },
        });
        return res.status(200).json(admin);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong"});
    }
};

export const loginBusinessAdmin = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    try {
        const admin = await prisma.businessAdmin.findUnique({where: {email}});

        if (!admin) {
            return res.status(404).json({error: "Admin not found"});
        }

        const isPasswordValid = await comparePassword(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({error: "Invalid password"});
        }

        const token = await generateToken({id: admin.id, role: admin.role});
        console.log(token)
        const adminResponse = {
            id: admin.id,
            name: admin.name,
            email: admin.email,
            phone: admin.phone,
            role: admin.role,
            token,
        };

        // Send success response
        return res.status(200).json(adminResponse);
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({error: "Something went wrong"});
    }
};
