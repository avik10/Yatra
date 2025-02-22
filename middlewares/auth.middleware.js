const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const BlacklistToken = require('../models/blacklistTokens.mdoel');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '') || req.cookies.token;

    if (!token) {
        return res.status(401).send({ error: 'Access denied. No token provided.' });
    }

    const blackListedToken = await BlacklistToken.findOne({ token })
    if (blackListedToken) {
        return res.status(401).send({ error: 'Access denied. token expired.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const User = await userModel.findById(decoded._id);
        req.User = User

        next();
    } catch (ex) {
        res.status(400).send({ error: ex.mssage });
    }
};

module.exports = authMiddleware;