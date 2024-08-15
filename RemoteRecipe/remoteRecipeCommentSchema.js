import mongoose from 'mongoose';

const remoteRecipeCommentSchema = new mongoose.Schema({
    idMeal: {type: String, required: true},
    username: {type: String, required: true},
    comment: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
}, {collection: "remoteRecipeComments"});

export default remoteRecipeCommentSchema;