import User from "../models/User.js";

const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if(user){
            throw new Error(`${email} is already registered`);
        }

        user = await User.create({
            name,
            email,
            password
        });

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            avatar: user.avatar,
            savedRecipes: user.savedRecipes,
            token: await user.generateJWT()
        })
    } catch (error) {
        next(error);
    }
};

const signin = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        let user = await User.findOne({ email });

        if(!user){
            throw new Error('Email not found');
        }

        if(await user.comparePassword(password)){
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                avatar: user.avatar,
                savedRecipes: user.savedRecipes,
                token: await user.generateJWT()
            })
        } else {
            throw new Error('invalid email or password');
        }
    } catch (error) {
        next(error)
    }
}

export {signup, signin}