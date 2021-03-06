import mongoose from "mongoose";

const Post = mongoose.Schema({
    userId:{
        type: String,
        required: true  
    },
    profilePhoto: {
        type: String,
        default: "/img/defaultProfile.png"
    },
    displayName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true  
    },
    body: {
        type: String,
        required: true  
    },
    comments: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model('post', Post);


export default PostMessage;