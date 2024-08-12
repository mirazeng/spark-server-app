import model from "./model.js";

export const createUser = (user) => {
    delete user._id // this should be object id
    return model.create(user);
}

export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.find({username: userId});
export const findUserByUsername = (username) => model.findOne({username: username});
export const findUserByCredentials = (username, password) => model.findOne({username, password});
export const findUsersByRole = (role) => model
    .find({role: role});

export const updateUser = (userId, user) => model.updateOne({_id: userId}, {$set: user});
export const deleteUser = (userId) => model.deleteOne({_id: userId});
export const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return model.find({
        $or: [{firstName: {$regex: regex}}, {lastName: {$regex: regex}}, {username: {$regex: regex}}],
    }); // can be searched by first name, last name or username
}


