import express from 'express';

import { googleAuth, googleAuthCallback, authScreen, localLoginScreen, localLoginAuth } from '../controllers/auth.js';
const router = express.Router();

router.get('/', authScreen);
router.get('/login', localLoginScreen);
router.post('/login', localLoginAuth);
router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback);

export default router;