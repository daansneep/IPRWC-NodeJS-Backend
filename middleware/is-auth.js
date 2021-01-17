const jwt = require('jsonwebtoken');
const authDao = require('../dao/authDAO')

module.exports = async (req, res, next) => {
    const authHeader = req.get('Authorization');

    if(!authHeader){
        const error = new Error('Not authorized');
        error.statusCode = 401;
        next(error);
    }
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'Ur63UV5w99xpU1Sa9qjBx41co');
    } catch(error) {
        error.statuscode = 500;
        next(error);
    }
    if(!decodedToken) {
        const error = new Error('Not authorized');
        error.statusCode = 401;
        next(error);
    }

    const query = await authDao.getIsAdmin(decodedToken.accountnumber)
        .catch(error => {
            error.statusCode = 500;
            next(error);
        });

    if(req.path.includes('admin') && !query.rows[0].isadmin) {
        const error = new Error('This resource is forbidden');
        error.statusCode = 403;
        next(error);
    }

    req.accountnumber = decodedToken.accountnumber;
    next();
};
