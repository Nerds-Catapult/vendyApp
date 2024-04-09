const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

function generateToken( user ) {
    // return jwt.sign({id: id},process.env.JWT_SECRET || 'secret',{expiresIn: '30d',});
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });
}


module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
};