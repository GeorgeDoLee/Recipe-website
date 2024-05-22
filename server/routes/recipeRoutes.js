import express from 'express';
import authGuard from '../middlewares/authGuard.js';
import { deleteRecipe, getRecipe, getRecipes, publishRecipe, updateRecipe } from '../controllers/recipeControllers.js';

const router = express.Router();

router.post('/publish-recipe', authGuard, publishRecipe)
router.get('/recipes', getRecipes)
router.get('/recipe', getRecipe);
router.put('/update-recipe', authGuard, updateRecipe);
router.delete('/delete-recipe', authGuard, deleteRecipe);

export {router as recipeRoutes}