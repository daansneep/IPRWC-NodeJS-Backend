const profileDao = require('../dao/profileDAO')

exports.getUserData = (req, res, next) => {
    profileDao.getUserData(req.accountnumber)
        .then(query => {
            const userInfo = query.rows[0];
            res.status(200).json( {
                message: 'Retrieved userinformation succesfully!',
                email: userInfo.email,
                postalcode: userInfo.postalcode,
                streetname: userInfo.streetname,
                housenumber: userInfo.housenumber,
                addition: userInfo.addition,
                city: userInfo.city,
                isadmin: userInfo.isadmin
            })
        })
        .catch(error => {
            if(!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        });
};

exports.postUserData = (req, res, next) => {
    profileDao.postUserData(req.accountnumber, req.body)
        .then(() => {
            res.status(200).json({
                message: 'Changes successfully applied to user profile'
            })
        })
        .catch(error => {
            if(!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        });
};
