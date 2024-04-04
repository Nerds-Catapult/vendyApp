const express = require('express');
const http = require('http');
const path = require('path')
const {PrismaClient} = require('@prisma/client');


require('dotenv').config();


const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = http.createServer(app);

const prisma = new PrismaClient();

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