import express from 'express';

import { alreadyAuthenticated } from '../middleware/isAuthenticated.js';
import { loginOptionsView, loginView, registerView } from '../controllers/userViews.js';
import { home } from '../controllers/index.js';
const router = express.Router();

//homepage
router.get('/', home);

//Authentication views
router.get('/', alreadyAuthenticated, loginOptionsView);
router.get('/register', alreadyAuthenticated, registerView);
router.get('/login', alreadyAuthenticated, loginView);

export default router;