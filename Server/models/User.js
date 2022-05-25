import mongoose from "mongoose";

const User = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: String,
    lastName: String,
    profilePhoto: String,
    password: String,
    source: {
        type: String,
        required: true
    },
    lastVisited: {
        type: Date,
        default: new Date()
    },
});

const UserModel = mongoose.model('User', User);


export default UserModel;