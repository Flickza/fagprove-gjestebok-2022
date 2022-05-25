import mongoose from "mongoose";

const Comment = mongoose.Schema({
    user:{
        type: String,
        required: true  
    },
    parentPostID: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true  
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model('Comment', Comment);


export default PostComment;