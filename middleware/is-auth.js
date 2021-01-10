const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // const authHeader = req.get('Authorization');
    // if(!authHeader){
    //     const error = new Error('Not authorized');
    //     error.statusCode = 401;
    //     throw error;
    // }
    // const token = req.get('Authorization').split(' ')[1];
    // let decodedtoken;
    // try {
    //     decodedToken = jwt.verify(token, 'webshopGCSAdminKey');
    // } catch(error) {
    //     error.statuscode = 500;
    //     throw error;
    // }
    // if(!decodedToken) {
    //     const error = new Error('Not authorized');
    //     error.statusCode = 401;
    //     throw error;
    // }
    // req.email = decodedToken.email;
    next();
};
