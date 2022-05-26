import express from 'express';

import { authScreen, googleAuth, googleAuthCallback } from '../controllers/auth.js';
import { localLoginScreen, localLoginAuth, localNewUserScreen, localNewUser, logout } from '../controllers/user.js';

const router = express.Router();


//default screen
router.get('/', authScreen);

//local auth
router.get('/login', localLoginScreen);
router.post('/login', localLoginAuth);

//local registration
router.get('/register', localNewUserScreen);
router.post('/register', localNewUser);

//logout
router.get('/logout', logout);

//social authentication
router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback);

export default router;