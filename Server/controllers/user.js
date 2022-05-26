import passport from 'passport';
import LocalStrategy from 'passport-local';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: true,
},
    function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            return done(null, user);
        });
    }
));

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
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) { return res.json({ success: false, message: "email was not given or password was not given!" }) }

    passport.authenticate('local', function (err, user, info) {
        if (err) {
            res.json({ success: false, message: err })
        } else {
            if (!user) {
                res.json({ success: false, message: 'email or password incorrect' })
            } else {
                req.login(user, function (err) {
                    if (err) {
                        res.json({ success: false, message: err })
                    } else {
                        const token = jwt.sign(
                            { userId: user._id, email: user.email },
                            process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
                        res.json({ success: true, message: "Authentication successful", token: token });
                    }
                })
            }
        }
    })(req, res);
}

export const localNewUser = (req, res) => {
    try {
        const Users = new User({ email: req.body.email, username: req.body.email.split("@")[0], source: "local" });

        if (req.body.password !== req.body.repeatPassword) return res.json({ message: "Passwords dont match!" });

        User.register(Users, req.body.password, function (err, user) {
            if (err) {
                res.json({
                    success: false, message: "Your account could not be saved.Error: ", err
                })
            } else {
                res.json({ success: true, message: "Your account has been saved" })
            }
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
