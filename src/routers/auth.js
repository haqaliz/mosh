import express from 'express';
import {
  auth as authController,
} from '../controllers/index.js';

const router = express.Router();

router.post('/login', authController.authenticate);
router.post('/logout', authController.logout);
router.post('/signup', authController.signup);

export default router;
