import mongoose from 'mongoose';

const remoteRecipeBookmarkSchema = new mongoose.Schema({
    username: {type: String, ref: 'User', required: true}, bookmarks: [{
        idMeal: {type: String, required: true}, bookmarkedAt: {type: Date, default: Date.now}
    }]
}, {collection: "remoteRecipeBookmarks"});

export default remoteRecipeBookmarkSchema;