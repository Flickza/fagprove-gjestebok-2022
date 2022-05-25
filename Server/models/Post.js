import mongoose from "mongoose";

const Post = mongoose.Schema({
    user: String,
    title: String,
    body: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const PostMessage = mongoose.model('PostMessage', Post);


export default PostMessage;