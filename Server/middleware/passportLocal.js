import LocalStrategy from 'passport-local';
import User from '../models/User.js';
import { validPassword } from '../config/validate/passwordUtils.js';

const customfields = {
    usernameField: 'email',
    passwordField: 'password'
};

const verifyCallback = (email, password, done) => {
    User.findOne({ email: email }, function (err, user) {
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


export const localStrategy = new LocalStrategy(customfields, verifyCallback);
