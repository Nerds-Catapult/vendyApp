const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { PrismaClient } = require('@prisma/client');


async function protectRoutes(req, res, next) {
    const token = req.header("Authorization")?.replace("Bearer ", "");
}