import express from 'express';
const router = express.Router();

import { userSignIn, userSignUp } from '../controllers/users.js';

router.post('/signIn', userSignIn);
router.post('/signUp', userSignUp);

export default router;


