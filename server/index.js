const express = require('express');
const http = require('http');
const path = require('path')


require('dotenv').config();


const app = express();


app.use(express.static(path.join(__dirname, 'public')));