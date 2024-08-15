import mongoose from 'mongoose';
import remoteRecipeBookmarkSchema from './remoteRecipeBookmarkSchema.js';

const RemoteRecipeBookmarkModel = mongoose.model('RemoteRecipeBookmark', remoteRecipeBookmarkSchema);

export default RemoteRecipeBookmarkModel;