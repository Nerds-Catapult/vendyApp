import  express from 'express';
import http from 'http';
import path from 'path'
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/router';
import Multer from 'multer';
import {handleUpload} from "./configs/appConfigs";
import {Request, Response} from "express";

dotenv.config();

const app = express();


//cors config 
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'public', 'index.html'));
    // res.send('Welcome to the API');
    if(req.accepts("json")){
        res.json({message: 'Welcome to the API'});
    } else {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
});

const server = http.createServer(app);

const prisma = new PrismaClient();

app.use('/api', router());
//multer
//@ts-ignore
const storage = new Multer.memoryStorage();
const upload = Multer({ storage });

app.post('/api/upload', upload.single('file'), async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;
        const cldRes = await handleUpload(dataURI);
        console.log(cldRes);
        return res.status(200).json({
            url : cldRes.url,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

//test prisma connection

async function isDatabaseWorking() {
    try {
        await prisma.$connect();
        console.log('Database is working');
    } catch (error) {
        console.error('Database is not working', error);
    }
}

isDatabaseWorking() && server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});