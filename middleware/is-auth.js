const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader){
        const error = new Error('Not authorized');
        error.statusCode = 401;
        throw error;
    }
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'Ur63UV5w99xpU1Sa9qjBx41co');
    } catch(error) {
        error.statuscode = 500;
        throw error;
    }
    if(!decodedToken) {
        const error = new Error('Not authorized');
        error.statusCode = 401;
        throw error;
    }
    if(req.path.includes('admin') && decodedToken.isadmin === false) {
        const error = new Error('This resource is forbidden');
        error.statusCode = 403;
        throw error;
    }
    req.email = decodedToken.email;
    next();
};
