import express from 'express';
import { registerUser, loginUser, getUserProfile} from '../controllers/userController';
import {protect} from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

export default router;