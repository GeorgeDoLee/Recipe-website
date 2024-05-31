import { Schema, model } from "mongoose";

const RatingSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
}, { _id: false });

const RecipeSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    ingredients: {type: [String], required: true},
    totalTime: { type: Number, required: true },
    author: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String, default: ''},
    ratings: [RatingSchema],
}, {timestamps: true});

const Recipe = model('Recipe', RecipeSchema);

export default Recipe;
