const express = require('express');
const controllers = require('../controllers/index.js');
const router = express.Router();


router.get('/current', controllers.user.getCurrent);
router.get('/services', controllers.user.getServices);

module.exports = router;
