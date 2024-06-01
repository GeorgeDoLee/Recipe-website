import axios from "axios";

const errorHandler = (error) => {
    if(error.response && error.response.data.message){
        throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
}

export const getRecipes = async (pagination, filters) => {
    try {
        const { page, limit } = pagination;
        let query = `?page=${page}&limit=${limit}`
        if (filters) {
            Object.keys(filters).forEach(key => {
                query += `&${key}=${encodeURIComponent(filters[key])}`;
            });
        }
        
        const { data } = await axios.get(`/api/recipe/recipes/${query}`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // just to demonstrate loading screen
        return data;
    } catch (error) {
        errorHandler(error);
    }
}

export const getRecipe = async (id) => {
    try {
        const { data } = await axios.get(`/api/recipe/recipe/${id}`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // just to demonstrate loading screen
        return data;
    } catch (error) {
        errorHandler(error);
    }
}

export const rateRecipe = async (updates) => {
    try {
        const { data } = await axios.put('/api/recipe/rate-recipe', updates);
        return data;
    } catch (error) {
        errorHandler(error);
    }
}

export const uploadRecipe = async (token, recipeData) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        const { data } = await axios.post('/api/recipe/publish-recipe', recipeData, config);
        return data;
    } catch (error) {
        errorHandler(error);

    }
}

export const editRecipe = async (token, recipeData) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        const { data } = await axios.put('/api/recipe/update-recipe', recipeData, config);
        return data;
    } catch (error) {
        errorHandler(error);
    }
}

export const deleteRecipe = async (token, _id) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        const { data } = await axios.delete(`/api/recipe/delete-recipe?_id=${_id}`, config);
        return data;
    } catch (error) {
        errorHandler(error);
    }
}