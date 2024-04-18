import  express from 'express';
import http from 'http';
import path from 'path'
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/router';
import multer from 'multer';
import { middlewareUploads } from './middlewares/uploads.cloudinary';


dotenv.config();

const app = express();


//cors config 
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const upload = multer();


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