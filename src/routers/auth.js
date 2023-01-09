const express = require('express');
const controllers = require('../controllers/index.js');
const router = express.Router();

router.post('/login', controllers.auth.authenticate);
router.post('/logout', controllers.auth.logout);
router.post('/signup', controllers.auth.signup);

module.exports = router;
