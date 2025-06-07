const jwt = require('jsonwebtoken');
const User = require('./models/User');

const optionalAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Authorization header:', authHeader);
    if (authHeader && authHeader.startsWith('Bearer ')) {
        try {
            const token = authHeader.split(' ')[1];
            console.log('Token:', token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded token:', decoded);
            req.user = await User.findById(decoded.id);
            console.log('User found:', req.user ? req.user.email : 'No user found');
        } catch (err) {
            console.error('JWT verification failed:', err.message);
            req.user = null;
        }
    } else {
        console.log('No Authorization header or does not start with Bearer');
        req.user = null;
    }
    next();
};

module.exports = optionalAuth;