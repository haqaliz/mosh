const express = require('express');
const controllers = require('../controllers/index.js');
const router = express.Router();

router.use((req, res, next) => {
  if (!req.user) return res.status(400).send('Unauthorized');
  next();
});

router.get('/current', controllers.user.getCurrent);
router.get('/services', controllers.user.getServices);

module.exports = router;
