import { Schema, model } from "mongoose";
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

const UserSchema = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: '' },
    savedRecipes: [{ type: String}],
    myRecipes: [{ type: String}],
}, {timestamps: true});

UserSchema.pre('save', async function(next) {
    if(this.isModified('password')){
        this.password = bcryptjs.hashSync(this.password, 10);
        return next();
    }
    return next();
})

UserSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password);
}

UserSchema.methods.generateJWT = async function() {
    return await jsonwebtoken.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

const User = model('User', UserSchema);

export default User;