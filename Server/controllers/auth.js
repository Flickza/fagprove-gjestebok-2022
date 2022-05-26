import passport from 'passport';
import '../src/config/google.js';

export const localLoginScreen = (req, res) => {
    try {
        res.render('../views/auth/login.ejs', {root: './'});
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const localLoginAuth = (req, res) => {
    console.log(req);
}

export const localRegisterScreen = (req, res) => {
    try {
        res.render('../views/auth/register.ejs', {root: './'});
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const authScreen = (req, res) => {
    try {
        res.render("../views/auth/auth.ejs", { root: "./" });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const googleAuth = (req, res) => {
    try {
        passport.authenticate("google", {
            scope: ["profile", "email"],
        })
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const googleAuthCallback = (req, res) => {
    try {
        passport.authenticate("google", {
            failureRedirect: "/",
            successRedirect: "/",
            failureFlash: true,
            successFlash: "Successfully logged in!",
        })
    } catch (error) {
        res.json({ message: error.message });
    }
}