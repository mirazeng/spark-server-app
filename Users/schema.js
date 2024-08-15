import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    first_name: {type: String, default: "DefaultFirstName"},
    last_name: {type: String, default: "DefaultLastName"},
    password: {type: String, required: true},
    email: {type: String, default: "mail@spark.com"},
    phone: {type: String, default: "1234567890"},
    dob: {type: Date, default: Date.now},
    role: {
        type: String, enum: ["VIP", "INFLUENCER", "ADMIN", "USER"], default: "USER",
    },
    gender: {type: String, default: "Other"},
    description: {type: String, default: "This is a description"},
    profilePicture: {type: String, default: "/headicon.png"},
    followers: [String],
    following: [String],
}, {collection: "users"});

export default userSchema;