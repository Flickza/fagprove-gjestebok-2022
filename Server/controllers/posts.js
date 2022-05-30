//import model
import PostMessage from '../models/Post.js';
import mongoose from 'mongoose';


export const getPosts = (req, res, next) => {
    try {
        //id of user who requested posts
        let userId = null;

        //if user who request is admin or not
        let isAdmin = false;

        //check if there is a user logged in making the request
        if (req.user) {
            userId = req.user._id;
            isAdmin = req.user.admin;
        }

        //find all posts of Model
        PostMessage.find({}, (err, posts) => {
            //forward to error handler
            if (err) return next({ statusCode: 500, message: err.message });

            //respond with all model data
            res.status(200).json({ success: true, posts: posts, requestFrom: userId, isAdmin: isAdmin });

        }).sort({ createdAt: 'desc' });
    } catch (error) {
        //forward to error handler
        return next({ statusCode: 500, message: error.message });
    }
};

export const createPost = (req, res, next) => {
    //try saving to collection
    try {
        if (!req.body.title || !req.body.body) return next({ statusCode: 401, message: 'Title and Body are required' });
        //get data of user who sent request
        const userId = req.user.id;
        const username = req.user.username;

        //get variables from form post
        const title = req.body.title;
        const body = req.body.body;

        //create a new model with variables from form post
        const Post = new PostMessage({
            userId: userId,
            username: username,
            title: title,
            body: body,
            createdAt: new Date()
        });
        Post.save((err, post) => {
            //forward to error handler
            if (err) return next({ statusCode: 500, message: err.message });

            res.status(201).json({ success: true, message: "New post created!" });
        });
    } catch (error) {
        //forward to error handler
        return next({ statusCode: 500, message: error.message });
    }
};

export const updatePost = (req, res, next) => {
    try {
        //get id of user who requested update
        const userId = req.user.id;
        //check if user is admin (true/false)
        const isAdmin = req.user.admin;

        //get variables from post request
        const id = req.params.id;
        const title = req.body.title;
        const body = req.body.body;

        //update model with variables from form post
        PostMessage.findOne({ _id: id }, (err, post) => {
            //forward to error handler
            if (err) return next({ statusCode: 500, message: err.message });
            if (!post) return next({ statusCode: 404, message: "Not Found" });

            //check if user who requested the update is the user who created the post or if user is admin
            //update the post if user is authorized
            if (post._id === userId || isAdmin) {
                post.title = title;
                post.body = body;
                post.save().then(res.status(201).json({ success: true, message: "The post was edited successfully." }));
            } else {
                //respond with error message if user is not authorized
                res.status(401).json({ success: false, message: "You are not authorized to update this post." });
            }
        });
    } catch (error) {
        return next({ statusCode: 500, message: error.message });
    }
};

export const commentPost = (req, res, next) => {
    try {
        //id of post to be commented
        const id = req.params.id;

        //user who commented
        const userId = req.user.id;
        const authorName = req.user.username;
        //get variables from form post
        const comment = req.body.commentField;

        //find parent post by id of post
        PostMessage.findOne({ _id: id }, (err, post) => {
            //forward to error handler
            if (err) return next({ statusCode: 500, message: err.message });

            //check if there are any posts, throw error if not found
            if (!post) return next({ statusCode: 404, message: "Not Found" });

            //push comment to comments array of parent post
            post.updateOne({
                $push: {
                    comments: {
                        _id: new mongoose.Types.ObjectId(),
                        userId: userId,
                        authorName: authorName,
                        comment: comment,
                        createdAt: new Date()
                    }
                }
            }).then(res.status(201).json({ success: true, message: "Comment posted successfully." }));
        });
    } catch (error) {
        //forward to error handler
        return next({ statusCode: 500, message: error.message });
    }
};

export const deletePost = (req, res, next) => {
    try {
        //get variables from form post
        const postId = req.params.id;

        //get id of user who requested DELETE
        const userId = req.user.id;

        //check if user is admin
        const isAdmin = req.user.admin;

        //delete model with variables from form post
        PostMessage.findOne({ _id: postId }, (err, post) => {
            if (err) return next({ statusCode: 500, message: err.message });

            //check if there are any posts, throw error if not found
            if (!post) return next({ statusCode: 404, message: "Not Found" });

            if (post.user === userId || isAdmin) {
                PostMessage.findByIdAndDelete(postId, (err, post) => {
                    if (err) return next({ statusCode: 500, message: err.message });

                    res.status(200).json({ success: true, message: "Post has been deleted successfully." });
                });
            } else {
                res.status(401).json({ success: false, message: "You are not authorized to delete this post" });
            }
        })
    } catch (error) {
        return next({ statusCode: 500, message: error.message });
    }

};

export const deleteComment = (req, res, next) => {
    try {
        //get user who requested delete
        const userId = req.user.id;

        //check if user is admin (true/false)
        const isAdmin = req.user.admin;

        //get variables from form post
        const postId = req.params.postId;
        const commentId = req.params.commentId;

        //get parent post that contains comment with id (commentId)
        PostMessage.findOne({ _id: postId, }, (err, post) => {
            if (err) return next({ statusCode: 500, message: err.message });

            //check if there are any posts, throw error if not found
            if (!post) return next({ statusCode: 404, message: "Not Found" });

            //get filter comments of retrieved posts to get the post that contains comment with id (commentId)
            const comment = post.comments.filter((c) => c._id.toString() === commentId);

            //check if user is authorized to delete comment (user id from session matches user id from comment)
            //if user is authorized, delete the comment
            if (comment[0].userId === userId || isAdmin) {
                PostMessage.findByIdAndUpdate(postId, {
                    $pull: {
                        comments: { _id: mongoose.Types.ObjectId(commentId) }
                    }
                }, (err, post) => {
                    //forward to error handler
                    if (err) return next({ statusCode: 500, message: err.message });

                    //if no error, send success message
                    res.status(200).json({ success: true, message: "Comment has been deleted successfully." });
                });
            } else {
                //if user is not authorized, send error message
                res.status(401).json({ success: false, message: "You are not authorized to delete this comment" });
            }
        })
    } catch (error) {
        //forward to error handler
        return next({ statusCode: 500, message: error.message });
    }

};