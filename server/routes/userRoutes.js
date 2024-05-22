import express from 'express';
import { updateProfile, userProfile, deleteProfile } from '../controllers/userControllers.js';
import authGuard from '../middlewares/authGuard.js';

const router = express.Router();

router.get('/profile', authGuard, userProfile);
router.put('/update-profile', authGuard, updateProfile);
router.delete('/delete-profile', authGuard, deleteProfile);

export {router as userRoutes};