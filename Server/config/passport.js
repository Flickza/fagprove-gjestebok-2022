import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/User.js';
import { validPassword } from '../config/validate/passwordUtils.js';

const customfields = {
    usernameField: 'email',
    passwordField: 'password'
};

const verifyCallback = (email, password, done) => {
    User.findOne({ email: email }, function (err, user) {
        console.log(user);
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: 'Incorrect email or password.' });
        }
        const isValid = validPassword(password, user.hash, user.salt);

        if (isValid) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}


const strategy = new LocalStrategy(customfields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((userId, done) => {
    User.findById(userId, (err, user) => {
        done(err, user);
    });
});