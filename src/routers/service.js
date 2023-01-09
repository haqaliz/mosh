const express = require('express');
const controllers = require('../controllers/index.js');
const router = express.Router();

router.use((req, res, next) => {
  if (!req.user) return res.status(400).send('Unauthorized');
  next();
});

router.post('/', controllers.service.create);

router.get('/:id', controllers.service.getById);

router.post('/:id/folder', controllers.service.createFolder);

router.post('/:id/request', controllers.service.createRequest);

module.exports = router;