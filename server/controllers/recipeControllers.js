import Recipe from "../models/Recipe.js";

const publishRecipe =  async (req, res, next) => {
    try {
        const { title, description, category, ingredients, totalTime } = req.body;

        const recipe = await Recipe.create({
            title,
            description,
            category,
            ingredients,
            totalTime,
            author: req.user.name,
            authorId: req.user._id
        });

        return res.status(200).json(recipe)
    } catch (error) {
        next(error);
    }
}

const getRecipes = async (req, res, next) => {
    try {
        const filters = { ...req.query };

        if(filters.ingredients){
            filters.ingredients = { $in: filters.ingredients.split(',')};
            filters._id = { $ne: filters._id };
        } else if(filters._id){
            filters._id = filters._id.split(',');
        }

        delete filters.page;
        delete filters.limit;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const skip = (page - 1) * limit;
        
        const recipes = await Recipe.find(filters).skip(skip).limit(limit) || [];
        return res.status(200).json(recipes);
    } catch (error) {
        next(error);
    }
};
  
const getRecipe = async (req, res, next) => {
    try {
        let recipe = await Recipe.findById(req.params.id);

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

const rateRecipe = async (req, res, next) => {
    try {
        let recipe = await Recipe.findById(req.body._id);

        if (req.body.rating && req.body.ratingAuthorId) {
            const ratingAuthorId = req.body.ratingAuthorId;
            const newRating = req.body.rating;
            let existingRatingIndex = recipe.ratings.findIndex(rating => rating.userId.equals(ratingAuthorId));
    
            if (existingRatingIndex !== -1) {
                if (recipe.ratings[existingRatingIndex].rating !== newRating) {
                    recipe.ratings[existingRatingIndex].rating = newRating;
                }
            } else {
                recipe.ratings.push({ userId: ratingAuthorId, rating: newRating });
            }
        }

        const updatedRecipe = await recipe.save();

        return res.status(200);
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

export {publishRecipe, getRecipes, getRecipe, updateRecipe, deleteRecipe, rateRecipe}