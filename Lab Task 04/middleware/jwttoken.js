const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, 'jwtSecret');
        req.user = decoded.user;
        next();
    } catch (err) {
        res.clearCookie('token').redirect('/login');
    }
};

module.exports = auth;
