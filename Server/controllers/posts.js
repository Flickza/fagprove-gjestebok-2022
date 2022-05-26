//import model
import PostMessage from '../models/Post.js';
import mongoose from 'mongoose';

export const getPosts = (req, res) => {
    //find all posts of Model
    PostMessage.find({}, (err, posts) => {
        if (err) {
            //if error give error message
            res.send(err);
        }
        //respond with all model data
        res.json(posts);
    });
}
export const createPost = (req, res) => {
    //get variables from form post
    const user = "testuser";
    const title = req.body.title;
    const body = req.body.body;

    //create a new model with variables from form post
    const Post = new PostMessage({
        user: user,
        title: title,
        body: body,
        createdAt: new Date()
    });

    //try saving to collection
    try {
        Post.save((err, post) => {
            if (err) {
                console.log(err);
            }
            console.log(post);
            res.json(post);
        });
        //catch error if any
    } catch (error) {
        res.json(error);
    }
}

export const updatePost = (req, res) => {
    //get variables from form post
    const id = req.params.id;
    const title = req.body.title;
    const body = req.body.body;
    //update model with variables from form post
    PostMessage.findByIdAndUpdate(id, { $set: { title: title, body: body, updatedAt: new Date() } }, { new: true }, (err, post) => {
        if (err) {
            res.json(err);
        }
        res.json(post);
    });
}

export const commentPost = (req, res) => {
    //id of post to be commented
    const id = req.params.id;

    //user who commented
    const userId = "testuser";
    //get variables from form post
    const comment = req.body.commentField;

    //update model with variables from form post
    PostMessage.findByIdAndUpdate(id, {
        $push: {
            comments: {
                _id: new mongoose.Types.ObjectId(),
                user: userId,
                comment: comment,
                createdAt: new Date()
            }
        }
    }, { new: true }, (err, post) => {
        if (err) {
            res.json(err);
        }
        res.json(post);
    });
}

export const deletePost = (req, res) => {
    //get variables from form post
    const id = req.params.id;
    //delete model with variables from form post
    PostMessage.findByIdAndDelete(id, (err, post) => {
        if (err) {
            res.json(err);
        }
        res.json(post);
    });
}

export const deleteComment = (req, res) => {
    //get variables from form post
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    //delete object from posts array with comment of id
    PostMessage.findByIdAndUpdate(postId,
        { $pull: { comments: { _id: mongoose.Types.ObjectId(commentId) } } },
        (err, post) => {
            if (err) {
                res.json(err);
            }
            res.json(post);
        });
}