import axios from "axios";

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
        await new Promise(resolve => setTimeout(resolve, 1000));
        return data;
    } catch (error) {
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message)
        }
        throw new Error(error.message)
    }
}

export const getRecipe = async (id) => {
    try {
        const { data } = await axios.get(`/api/recipe/recipe/${id}`);
        return data;
    } catch (error) {
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message)
        }
        throw new Error(error.message)
    }
}

export const rateRecipe = async (updates) => {
    try {
        const { data } = await axios.put('/api/recipe/rate-recipe', updates);
        return data;
    } catch (error) {
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message)
        }
        throw new Error(error.message)
    }
}