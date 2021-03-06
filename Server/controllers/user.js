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
//success middleware for authenticated user
export const success = (req, res, next) => {
    //send success message
    if (req.user) {
        return res.json({ success: true, message: "You have been logged in!" });
    }
    next();
}
//error middleware for authentication
export const failed = (err, req, res, next) => {
    //send error message
    if (err) return res.json({ success: false, message: err });
    //no error, continue
    next();
}
//new user
export const newUser = (req, res) => {
    try {
        //sanitize data from client
        const data = {
            email: req.sanitize(req.body.email),
            firstName: req.sanitize(req.body.firstName),
            lastName: req.sanitize(req.body.lastName),
            password: req.sanitize(req.body.password),
            repeatPassword: req.sanitize(req.body.repeatPassword)
        }

        //if the form fields are empty after sanitizing, return error
        if (data.firstName.length < 1 || data.lastName.length < 1 || data.email.length < 1) return res.json({ success: false, message: "Found empty fields." });
        //if the two passwords dont match return error
        if (data.password !== data.repeatPassword) return res.json({ success: false, message: "Passwords dont match!" });
        //check if user exists with email
        User.findOne({ "email.value": data.email.toLowerCase() }, (err, post) => {
            //if there is no user, create it
            if (post === null) {
                //create new user model
                const newUser = newLocalUser(data);

                //save new user model
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

