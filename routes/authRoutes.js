const express = require('express')

const isAuth = require('../middleware/is-auth');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/admin/users', isAuth, authController.getUsers)

// POST /register
// Register a regular user for purchasing
router.post('/register', authController.register)

// POST /login
// Login a regular user for purchasing
router.post('/login', authController.login)

// POST /login/admin
// Login an admin who can change the content on the site
router.post('/login/admin', authController.login)

// POST /register/admin
// Register another admin who can change the content on the site
router.post('/register/admin', isAuth, authController.register)


router.delete('/admin/delete/:id', isAuth, authController.deleteUser)

module.exports = router;
