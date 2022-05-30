import express from 'express';
import passport from 'passport';
import { loginOptionsView, loginView, registerView } from '../controllers/userViews.js';
import { success, failed, newUser, logout } from '../controllers/user.js';

import { alreadyAuthenticated, isAuthenticated } from '../middleware/isAuthenticated.js';

const router = express.Router();


//Views
router.get('/', alreadyAuthenticated, loginOptionsView);
router.get('/register', alreadyAuthenticated, registerView);
router.get('/login', alreadyAuthenticated, loginView);

//local auth
router.post('/login', alreadyAuthenticated, passport.authenticate('local', { failWithError: true }), success, failed);

//local registration
router.post('/register', alreadyAuthenticated, newUser);

//google auth
router.get('/google', alreadyAuthenticated, passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/google/callback', alreadyAuthenticated, passport.authenticate('google', { successRedirect: '/', failWithError: true }), success, failed);


//logout
router.get('/logout', isAuthenticated, logout);

export default router;