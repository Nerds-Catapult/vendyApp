const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d',
        }
    );
}


module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
};