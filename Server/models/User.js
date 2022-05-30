import mongoose from "mongoose";

const User = mongoose.Schema({
    email: {
        value: {
            type: String,
            required: true,
            unique: true
        },
        verified: Boolean
    },
    displayName: String,
    firstName: String,
    lastName: String,
    profilePhoto: String,
    source: {
        value: {
            type: String,
            required: true,
        },
        ids:
        {
            googleId: {
                type: String,
                default: null,
                required: false,
            },
            appleId: {
                type: String,
                default: null,
                required: false
            }
        },
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
    },

});


const UserModel = mongoose.model('User', User);


export default UserModel;