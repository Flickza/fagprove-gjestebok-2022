//import model
import PostMessage from '../models/Post.js';

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
