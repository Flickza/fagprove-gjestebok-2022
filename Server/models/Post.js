import mongoose from "mongoose";

const Post = mongoose.Schema({
    user:{
        type: String,
        required: true  
    },
    username: {
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