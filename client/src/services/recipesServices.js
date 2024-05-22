import axios from "axios";


export const getRecipes = async (authorId) => {
    try {
        console.log(authorId);
        const { data } = await axios.get(`/api/recipe/recipes/${authorId? authorId : ''}`)
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