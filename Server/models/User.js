import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

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
});

User.plugin(passportLocalMongoose);

const UserModel = mongoose.model('User', User);


export default UserModel;