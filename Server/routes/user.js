import express from 'express';
import passport from 'passport';
import { loginOptionsView, loginView, registerView } from '../controllers/userViews.js';
import { success, failed, newUser, logout } from '../controllers/user.js';

import { alreadyAuthenticated, isAuthenticated } from '../middleware/isAuthenticated.js';

const router = express.Router();


//default screen
router.get('/', alreadyAuthenticated, loginOptionsView);

//local auth
router.get('/login', alreadyAuthenticated, loginView);
router.post('/login', passport.authenticate('local', { failWithError: true }), success, failed);

//google auth
router.get('/google', alreadyAuthenticated, passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/google/callback', alreadyAuthenticated, passport.authenticate('google', { successRedirect: '/', failWithError: true }), success, failed);

//local registration
router.get('/register', alreadyAuthenticated, registerView);
router.post('/register', alreadyAuthenticated, newUser);

//logout
router.get('/logout', isAuthenticated, logout);

export default router;