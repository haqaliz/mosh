const express = require('express');
const controllers = require('../controllers/index.js');
const router = express.Router();

router.use((req, res, next) => {
  if (!req.user) return res.status(400).send('Unauthorized');
  next();
});

router.post('/', controllers.service.createService);

router.get('/:id', controllers.service.getServiceById);

router.post('/:id/folder', controllers.service.createFolder);

router.post('/:id/request', controllers.service.createRequest);

router.get('/:id/request/:request_id', controllers.service.getRequestById);

module.exports = router;
