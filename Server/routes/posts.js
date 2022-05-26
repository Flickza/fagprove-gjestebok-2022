import express from 'express';

import { getPosts, createPost, updatePost, deletePost, commentPost } from '../controllers/posts.js';
const router = express.Router();
router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.patch('/comment/:id', commentPost);
router.delete('/:id', deletePost);

export default router;