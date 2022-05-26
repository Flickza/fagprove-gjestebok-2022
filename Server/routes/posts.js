import express from 'express';

import { getPosts, createPost, updatePost, deletePost, commentPost, deleteComment } from '../controllers/posts.js';
const router = express.Router();
router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

router.patch('/comment/:id', commentPost);
router.delete('/comment/:postId/:commentId', deleteComment);

export default router;