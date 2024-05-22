import { Schema, model } from "mongoose";

const RecipeSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: {type: [String], required: true},
    totalTime: { type: Number, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String, default: ''},
    ratings: [{ type: Number, min: 1, max: 5 }],
}, {timestamps: true});

const Recipe = model('Recipe', RecipeSchema);

export default Recipe;
