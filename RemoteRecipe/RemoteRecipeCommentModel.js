import mongoose from 'mongoose';
import remoteRecipeCommentSchema from './remoteRecipeCommentSchema.js';

const RemoteRecipeCommentModel = mongoose.model('RemoteRecipeComment', remoteRecipeCommentSchema);

export default RemoteRecipeCommentModel;