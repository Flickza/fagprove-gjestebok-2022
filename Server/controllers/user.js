import User from '../models/User.js';
import { newLocalUser } from '../models/user/newLocalUser.js';

export const logout = (req, res, next) => {
    //log out the user
    req.logout((err) => {
        if (err) return next(err);
        //redirect to homepage
        res.redirect('/');
    });
}
export const success = (req, res, next) => {
    if (req.user) {
        return res.json({ success: true, message: "You have been logged in!" });
    }
    next();
}
export const failed = (err, req, res, next) => {
    if (err) return res.json({ success: false, message: err });
    next();
}

export const newUser = (req, res) => {
    try {
        //set request data into data variable
        const data = req.body;
        //if the two passwords dont match return error
        if (data.password !== data.repeatPassword) return res.json({ success: false, message: "Passwords dont match!" });
        //check if user exists with email
        User.findOne({ "email.value": data.email.toLowerCase() }, (err, post) => {
            //if there is no user, create it
            if (post === null) {
                const newUser = newLocalUser(data);

                newUser.save((err) => {
                    if (err) return res.json({ success: false, message: err });

                    res.json({ success: true, message: "User created!" });
                });
            } else {
                //return alert message if user exists
                res.json({ success: false, message: `Email already exists from source ${post.source.value}` });
            }
        });
    } catch (error) {
        return res.json({ success: false, message: error });
    }
}

