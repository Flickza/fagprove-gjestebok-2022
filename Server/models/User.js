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
    source: {
        type: String,
        required: true
    },
    lastVisited: {
        type: Date,
        default: new Date()
    },
    hash: String,
    salt: String,
    admin: {
        type: Boolean,
        default: false
    }
});


const UserModel = mongoose.model('User', User);


export default UserModel;