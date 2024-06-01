import axios from 'axios'

export const getUserProfile = async (id) => {
    try {
        const { data } = await axios.get(`/api/user/profile/${id}`)
        await new Promise(resolve => setTimeout(resolve, 1000)); // just to demonstrate loading screen
        return data;
    } catch (error) {
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message)
        }
        throw new Error(error.message)
    }
}

export const updateProfile = async ({token, userData}) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        const { data } = await axios.put('/api/user/update-profile', userData, config)
        return data;
    } catch (error) {
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message)
        }
        throw new Error(error.message)
    }
}

export const deleteProfile = async ({token}) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        const { data } = await axios.delete('/api/user/delete-profile', config);
        return data;
    } catch (error) {
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message)
        }
        throw new Error(error.message)
    }
}