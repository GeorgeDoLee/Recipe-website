import axios from "axios";

export const getRecipes = async (pagination, authorId) => {
    try {
        const { page, limit } = pagination;
        const query = `?page=${page}&limit=${limit}`
        const author = authorId ? authorId : '';
        const { data } = await axios.get(`/api/recipe/recipes/${author}${query}`);
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