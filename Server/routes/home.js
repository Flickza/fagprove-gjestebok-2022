import express from 'express';

import { home } from '../controllers/home.js';
const router = express.Router();

router.get('/', home);
router.get('/failed', (req, res) => {
    res.json({ error: "error" });
})
export default router;