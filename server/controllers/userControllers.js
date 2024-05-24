import User from "../models/User.js";

const userProfile = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id);

        if(user){
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                avatar: user.avatar,
                savedRecipes: user.savedRecipes
            })
        } else {
            let error = new Error('user not found');
            error.statusCode = 404;
            next(error);
        }
    } catch (error) {
        next(error);
    }
}

const updateProfile = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);

        if(!user){
            throw new Error('user not found');
        }

        user.name = req.body.newName || user.name;
        user.email = req.body.newEmail || user.email;

        if(req.body.newPassword && req.body.newPassword < 8){
            throw new Error('password must be at least 8 characters');
        } else if(req.body.newPassword){
            user.password = req.body.newPassword;
        }

        const { recipe } = req.body;
        if(recipe){
            if(recipe.save && !user.savedRecipes.includes(recipe._id)){
                user.savedRecipes.push(recipe._id);
            } else if(!recipe.save){
                user.savedRecipes = user.savedRecipes.filter(id => id !== recipe._id);
            }
        }

        const updatedUserProfile = await user.save();

        return res.status(200).json({
            _id: updatedUserProfile._id,
            name: updatedUserProfile.name,
            email: updatedUserProfile.email,
            password: updatedUserProfile.password,
            avatar: updatedUserProfile.avatar,
            savedRecipes: updatedUserProfile.savedRecipes,
            token: await updatedUserProfile.generateJWT()
        })
    } catch (error) {
        next(error);
    }
}

const deleteProfile = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);

        if(!user){
            throw new Error('user not found');
        }

        await user.deleteOne();
        return res.status(200).json({ message: 'user deleted successfully' });
    } catch (error) {
        next(error);        
    }
}


export { userProfile, updateProfile, deleteProfile };