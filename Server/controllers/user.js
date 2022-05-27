import User from '../models/User.js';
import { genPassword } from '../config/validate/passwordUtils.js';

export const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
}

export const localLoginScreen = (req, res) => {
    try {
        res.render('../views/auth/login.ejs', { root: './' });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const localLoginAuth = (req, res) => {
    try {
        res.json({ success: true, message: "You have been logged in!" })
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const localNewUser = (req, res) => {
    try {
        if (req.body.password !== req.body.repeatPassword) return res.json({ message: "Passwords dont match!" });
        const saltHash = genPassword(req.body.password);

        const salt = saltHash.salt;
        const hash = saltHash.hash;

        const Users = new User({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            source: "local",
            hash: hash,
            salt: salt
        });

        Users.save((err, user) => {
            if (err) return res.json({ message: err.message });
            res.json({ success: true, message: "User created!", user: user });
        });
    } catch (error) {
        res.json({ message: error });
    }
}

export const localNewUserScreen = (req, res) => {
    try {
        res.render('../views/auth/register.ejs', { root: './' });
    } catch (error) {
        res.json({ message: error.message });
    }
}
