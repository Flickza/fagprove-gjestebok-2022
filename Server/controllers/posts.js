//import model
import PostMessage from '../models/Post.js';
import mongoose from 'mongoose';

export const getPosts = (req, res) => {
    //id of user who requested posts
    let userId = null;
    if(req.user) userId = req.user._id;

    //find all posts of Model
    PostMessage.find({}, (err, posts) => {
        if (err) {
            //if error give error message
            res.send(err);
        }
        //respond with all model data
        res.json({ posts: posts, requestFrom: userId });
    }).sort({ createdAt: 'desc' });
}

export const createPost = (req, res) => {
    //get variables from form post
    const userId = req.user.id;
    const username = req.user.username;
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
                console.log(err);
            }
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
    const userId = req.user.id;

    //delete model with variables from form post
    PostMessage.findOne({ _id: postId }, (err, post) => {
        if (err) {
            res.json({ success: false, message: "Could not find post. Please try again." });
        }
        if (post.user === userId) {
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
        if (comment[0].userId === userId) {
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