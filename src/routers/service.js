import express from 'express';
import {
  service as serviceController,
} from '../controllers/index.js';

const router = express.Router();

router.post('/', serviceController.create);

router.get('/:id', serviceController.getById);

router.post('/:id/folder', serviceController.createFolder);

router.post('/:id/request', serviceController.createRequest);

export default router;
