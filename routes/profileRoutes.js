const express = require('express')

const isAuth = require('../middleware/is-auth');
const profileController = require('../controllers/profileController')

const router = express.Router();

// GET /data
// Get all data belonging to the user
router.get('/data', isAuth, profileController.getUserData)


// POST /data
// Change data from a user
router.post('/data', isAuth, profileController.postUserData)

module.exports = router;
