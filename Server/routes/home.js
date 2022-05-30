import express from 'express';

import { home } from '../controllers/home.js';
const router = express.Router();

router.get('/', home);
router.get('/failed', (req, res) => {
    res.status(404).json({success: false, message: "Failed to authenticate"});
})
export default router;