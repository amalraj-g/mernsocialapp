import express from 'express';

import { getPosts, createPost, updatePost, likePost, deletePost } from '../controllers/posts.js';

const router = express.Router();
import auth from '../middleware/auth.js';
import errorHandler from '../middleware/errorHandler.js';

router.get('/', getPosts);
router.post('/',errorHandler, auth, createPost);
router.patch('/:id',errorHandler, auth, updatePost);
router.delete('/:id',errorHandler, auth, deletePost);
router.put('/:id/likePost',errorHandler, auth, likePost);

export default router;