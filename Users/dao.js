import model from "./model.js";


export const createUser = (user) => {
    delete user._id;
    return model.create(user);
}

export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) => model.findOne({username: username});
export const findUserByCredentials = (username, password) => model.findOne({username, password});
export const findUsersByRole = (role) => model.find({role: role});

export const updateUser = (userId, user) => model.findByIdAndUpdate(userId, user, {new: true});
export const deleteUser = (userId) => model.findByIdAndDelete(userId);
export const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i");
    return model.find({
        $or: [{first_name: {$regex: regex}}, {last_name: {$regex: regex}}, {username: {$regex: regex}}],
    });
}

export const followUser = async (followerUsername, followedUsername) => {
    await model.findOneAndUpdate({username: followerUsername}, {$addToSet: {following: followedUsername}});
    return model.findOneAndUpdate({username: followedUsername}, {$addToSet: {followers: followerUsername}}, {new: true});
}

export const unfollowUser = async (followerUsername, followedUsername) => {
    await model.findOneAndUpdate({username: followerUsername}, {$pull: {following: followedUsername}});
    return model.findOneAndUpdate({username: followedUsername}, {$pull: {followers: followerUsername}}, {new: true});
}

export const addBookmark = (userId, recipeId) => model.findByIdAndUpdate(userId, {$addToSet: {bookmarks: recipeId}}, {new: true});

export const removeBookmark = (userId, recipeId) => model.findByIdAndUpdate(userId, {$pull: {bookmarks: recipeId}}, {new: true});

export const getBookmarks = (userId) => model.findById(userId).populate('bookmarks').select('bookmarks');

export const getFollowing = async (username) => {
    const user = await model.findOne({username: username});
    return model.find({username: {$in: user.following}});
};

export const getFollowers = async (username) => {
    const user = await model.findOne({username: username});
    return model.find({username: {$in: user.followers}});
};

