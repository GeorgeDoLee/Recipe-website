import express from 'express';
import authGuard from '../middlewares/authGuard.js';
import { deleteRecipe, getRecipe, getRecipes, publishRecipe, updateRecipe, rateRecipe } from '../controllers/recipeControllers.js';

const router = express.Router();

router.post('/publish-recipe', authGuard, publishRecipe)
router.get('/recipes', getRecipes)
router.get('/recipe/:id', getRecipe);
router.put('/update-recipe', authGuard, updateRecipe);
router.put('/rate-recipe', rateRecipe);
router.delete('/delete-recipe', authGuard, deleteRecipe);

export {router as recipeRoutes}