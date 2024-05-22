import Recipe from "../models/Recipe.js";

const publishRecipe =  async (req, res, next) => {
    try {
        const { title, description, ingredients, totalTime } = req.body;
        const authorId = req.user._id;

        const recipe = await Recipe.create({
            title,
            description,
            ingredients,
            totalTime,
            authorId
        });

        return res.status(200).json(recipe)
    } catch (error) {
        next(error);
    }
}

const getRecipes = async (req, res, next) => {
    try {
      let recipes;
  
      let filter = {};
      if (req.body.authorId) {
        filter.authorId = req.body.authorId;
      }
  
      recipes = await Recipe.find(filter);
  
      if (!recipes.length) {
        return res.status(200).json({ message: 'There are no recipes to display.' });
      }
  
      return res.status(200).json(recipes);
    } catch (error) {
      next(error);
    }
  };
  
const getRecipe = async (req, res, next) => {
    try {
        let recipe = await Recipe.findById(req.body._id);

        if(recipe){
            return res.status(200).json(recipe)
        } else {
            let error = new Error('recipe not found');
            error.statusCode = 404;
            next(error);
        }
    } catch (error) {
        next(error);
    }
}

const updateRecipe = async (req, res, next) => {
    try {
        let recipe = await Recipe.findById(req.body._id);

        if(!recipe){
            throw new Error('Recipe not found');
        } else if(!req.user._id.equals(recipe.authorId)) {
            throw new Error('You can\'t edit this recipe');
        }

        recipe.title = req.body.newTitle || recipe.title;
        recipe.description = req.body.newDescription || recipe.description;
        recipe.ingredients = req.body.newIngredients || recipe.ingredients;
        recipe.totalTime = req.body.totalTime || recipe.totalTime;

        const updatedRecipe = await recipe.save();

        return res.status(200).json(updatedRecipe)
    } catch (error) {
        next(error);
    }
}

const deleteRecipe = async (req, res, next) => {
    try {
        let recipe = await Recipe.findById(req.body._id);

        if(!recipe){
            throw new Error('recipe not found');
        } else if(!recipe.authorId.equals(req.user._id)){
            throw new Error('You can\'t delete this recipe')
        }

        await recipe.deleteOne();
        return res.status(200).json({ message: 'recipe deleted successfully' });
    } catch (error) {
        next(error);        
    }
}

export {publishRecipe, getRecipes, getRecipe, updateRecipe, deleteRecipe}