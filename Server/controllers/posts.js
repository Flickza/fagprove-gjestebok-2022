//import model
import PostMessage from '../models/Post.js';
import mongoose from 'mongoose';

export const getPosts = (req, res) => {
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
        if (err) {
            //if error give error message
            res.send({ success: false, message: err });
        }
        //respond with all model data
        res.json({ success: true, posts: posts, requestFrom: userId, isAdmin: isAdmin });
    }).sort({ createdAt: 'desc' });
}

export const createPost = (req, res) => {
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

    //try saving to collection
    try {
        Post.save((err, post) => {
            if (err) {
                res.json({ success: false, message: "Error saving post." });
            }
            res.json({ success: true, message: "New post created!" });
        });
        //catch error if any
    } catch (error) {
        res.json({ success: false, message: error });
    }
}

export const updatePost = (req, res) => {
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
        if (err) {
            res.json(err);
        }
        //check if user who requested the update is the user who created the post or if user is admin
        //update the post if user is authorized
        if (post._id === userId || isAdmin) {
            post.title = title;
            post.body = body;
            post.save().then(res.json({ success: true, message: "The post was edited successfully." }));
        } else {
            //respond with error message if user is not authorized
            res.json({ success: false, message: "You are not authorized to update this port." });
        }
    });
}

export const commentPost = (req, res) => {
    //id of post to be commented
    const id = req.params.id;

    //user who commented
    const userId = req.user.id;
    const authorName = req.user.username;
    //get variables from form post
    const comment = req.body.commentField;

    //update model with variables from form post
    PostMessage.findByIdAndUpdate(id, {
        $push: {
            comments: {
                _id: new mongoose.Types.ObjectId(),
                userId: userId,
                authorName: authorName,
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
    const postId = req.params.id;

    //get id of user who requested DELETE
    const userId = req.user.id;

    //check if user is admin
    const isAdmin = req.user.admin;

    //delete model with variables from form post
    PostMessage.findOne({ _id: postId }, (err, post) => {
        if (err) {
            res.json({ success: false, message: "Could not find post. Please try again." });
        }
        if (post.user === userId || isAdmin) {
            PostMessage.findByIdAndDelete(postId, (err, post) => {
                if (err) {
                    res.json({ success: false, message: "Could not find post. Please try again." });
                }
                res.json(post);
            });
        } else {
            res.json({ success: false, message: "You are not authorized to delete this post" });
        }
    })
};

export const deleteComment = (req, res) => {
    //get user who requested delete
    const userId = req.user.id;

    //check if user is admin (true/false)
    const isAdmin = req.user.admin;

    //get variables from form post
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    //get parent post that contains comment with id (commentId)
    PostMessage.findOne({
        _id: postId,
        comment: {
            $match: {
                _id: mongoose.Types.ObjectId(commentId),
                userId: userId
            }
        }
    }, (err, post) => {
        if (err) res.json(err);

        //check if there are any posts
        if (post.length < 1) return res.json({ success: false, message: "Could not find comment. Please try again." });

        //get filter comments of retrieved posts to get the post that contains comment with id (commentId)
        const comment = post.comments.filter((c) => c._id.toString() === commentId);

        //check if user is authorized to delete comment (user id from session matches user id from comment)
        //if user is authorized, delete the comment
        if (comment[0].userId === userId || isAdmin) {
            PostMessage.findByIdAndUpdate(postId,
                { $pull: { comments: { _id: mongoose.Types.ObjectId(commentId) } } },
                (err, post) => {
                    //if error, send error message
                    if (err) {
                        res.json({ success: false, message: "Something Went wrong. Try again later..." });
                    }
                    res.json({ success: true, message: "Comment deleted." });
                });
        } else {
            res.json({ success: false, message: "You are not authorized to delete this comment" });
        }
    })

}