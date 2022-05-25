import express from 'express';

import { googleAuth, googleAuthCallback, authScreen } from '../controllers/auth.js';
const router = express.Router();

router.get('/', authScreen);
router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback);

export default router;