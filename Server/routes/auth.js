import express from 'express';
import passport from 'passport';

import { authScreen, googleAuth, googleAuthCallback } from '../controllers/auth.js';
import { localLoginScreen, localLoginAuth, localNewUserScreen, localNewUser, logout } from '../controllers/user.js';

import { alreadyAuthenticated, isAuthenticated } from '../middleware/isAuthenticated.js';

const router = express.Router();


//default screen
router.get('/', alreadyAuthenticated, authScreen);

//local auth
router.get('/login', alreadyAuthenticated, localLoginScreen);
router.post('/login', passport.authenticate('local'), localLoginAuth);

//local registration
router.get('/register', alreadyAuthenticated, localNewUserScreen);
router.post('/register', alreadyAuthenticated, localNewUser);

//logout
router.get('/logout', isAuthenticated, logout);

//social authentication
router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback);

export default router;