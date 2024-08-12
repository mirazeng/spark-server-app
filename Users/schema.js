import mongoose from 'mongoose';

const followerSchema = new mongoose.Schema({
    username: String,
}, {collection: "followers"});

const followingSchema = new mongoose.Schema({
    username: String,
}, {collection: "following"});

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    firstName: String,
    lastName: String,
    password: {type: String, required: true},
    email: String,
    phone: String,
    dob: Date, // database currently does not have roles to assign to different users.
    role: {
        type: String, enum: ["VIP", "INFLUENCER", "ADMIN", "USER"], default: "USER",
    },
    followers: {
        type: [followerSchema], default: []
    },
    following: {
        type: [followingSchema], default: []
    },
}, {collection: "users"});

export default userSchema;