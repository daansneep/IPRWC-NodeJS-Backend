const authDao = require('../dao/authDAO');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.register = (req, res, next) => {
    const { email, password } = req.body;

    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            if (req.path.includes('admin')) {
                authDao.registerUser(email, hashedPassword, true)
                    .then(() => {
                        res.status(200).json({
                            message: 'Created new admin successfully!'
                        });
                    })
                    .catch(err => {
                        if (!err.statusCode) {
                            err.statusCode = 500;
                        }
                    });
            } else {
                authDao.registerUser(email, hashedPassword, false)
                    .then(() => {
                        res.status(200).json({
                            message: 'Created new user successfully!'
                        });
                    })
                    .catch(err => {
                        if (!err.statusCode) {
                            err.statusCode = 500;
                        }
                    });
            }
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.login = (req, res, next) => {
    const { email, password } = req.body;
    let userToLogin;

    authDao.getAccountByEmail(email)
        .then(user => {
            if (user.rows.length < 1) {
                const error = new Error('User with this email does not exist!');
                error.statusCode = 401
                throw error;
            }
            userToLogin = user.rows[0]
            return bcrypt.compare(password, userToLogin.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('The entered password is incorrect')
                error.statusCode = 401;
                throw error;
            }
            let isAdmin = false;
            if (userToLogin.isadmin) {
                isAdmin = true;
            }

            const token = jwt.sign({accountnumber: userToLogin.accountnumber}, 'Ur63UV5w99xpU1Sa9qjBx41co',
                {expiresIn: '1h'});

            res.status(200).json({
                message: 'User authorization is successful!',
                token: token,
                email: userToLogin.email,
                isadmin: isAdmin
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
