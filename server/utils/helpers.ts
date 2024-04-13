// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

interface userInterface {
        id: number;
        role: string;
}

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const  hashPassword=async(password:string)=> {
    return await bcrypt.hash(password, 10);
}

export const comparePassword = async(password:string, hashedPassword:string)=> {
    return await bcrypt.compare(password, hashedPassword);
}

export const  generateToken=async({id, role}: userInterface) =>{
    return jwt.sign({ id: id, role: role }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });
}
