import RemoteRecipeCommentModel from "./RemoteRecipeCommentModel.js";
import model from "../Users/model.js";
import RemoteRecipeBookmarkModel from "./RemoteRecipeBookmarkModel.js";

export const addRemoteRecipeComment = (idMeal, username, comment) => {
    return RemoteRecipeCommentModel.create({idMeal, username, comment});
};

export const getRemoteRecipeComments = (idMeal) => {
    return RemoteRecipeCommentModel.find({idMeal}).sort({createdAt: -1});
};

export const deleteRemoteRecipeComment = (commentId) => {
    return RemoteRecipeCommentModel.findByIdAndDelete(commentId);
};

export const findRemoteRecipeCommentById = (commentId) => {
    return RemoteRecipeCommentModel.findById(commentId);
};

export const isUserVIPOrAdmin = async (username) => {
    const user = await model.findOne({username});
    return user && (user.role === "VIP" || user.role === "ADMIN");
};

export const addRemoteRecipeBookmark = async (username, idMeal) => {
    const bookmark = await RemoteRecipeBookmarkModel.findOne({username});
    if (bookmark) {
        return RemoteRecipeBookmarkModel.findOneAndUpdate({username}, {$addToSet: {bookmarks: {idMeal}}}, {new: true});
    } else {
        return RemoteRecipeBookmarkModel.create({username, bookmarks: [{idMeal}]});
    }
};

export const removeRemoteRecipeBookmark = (username, idMeal) => {
    return RemoteRecipeBookmarkModel.findOneAndUpdate({username}, {$pull: {bookmarks: {idMeal}}}, {new: true});
};

export const getUserRemoteRecipeBookmarks = async (username) => {
    const bookmarks = await RemoteRecipeBookmarkModel.findOne({username});
    return bookmarks ? bookmarks.bookmarks : [];
};

export const isRemoteRecipeBookmarked = async (username, idMeal) => {
    const bookmark = await RemoteRecipeBookmarkModel.findOne({username});
    return bookmark ? bookmark.bookmarks.some(b => b.idMeal === idMeal) : false;
};