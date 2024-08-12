import mongoose from 'mongoose';
import userSchema from "../Users/schema.js";

const foodRecipeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    imagePath: {type: String, required: true},
    instructions: [{type: String, required: true}],
    creator: {
        type: [String], default: []
    },
    likes: {
        type: Number, default: 0
    },
    createdAt: {
        type: Date, default: Date.now
    },
    updatedAt: {
        type: Date, default: Date.now
    }
}, {
    collection: "foodRecipes"
});

export default foodRecipeSchema;