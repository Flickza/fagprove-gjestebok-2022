import express from 'express';

import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { getPosts, createPost, updatePost, deletePost, commentPost, deleteComment } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);

router.post('/', isAuthenticated, createPost);
router.patch('/:id', isAuthenticated, updatePost);
router.delete('/:id', isAuthenticated, deletePost);

router.patch('/comment/:id', isAuthenticated, commentPost);
router.delete('/comment/:postId/:commentId', isAuthenticated, deleteComment);

export default router;