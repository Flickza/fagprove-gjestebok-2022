import LocalStrategy from 'passport-local';
import User from '../models/User.js';
import { validPassword } from '../config/validate/passwordUtils.js';

const customfields = {
    usernameField: 'email',
    passwordField: 'password'
};

const verifyCallback = (email, password, done) => {
    User.findOne({ "email.value": email.toLowerCase() }, function (err, user) {
        if (err) return done(err);

        if (user === null) return done('Incorrect email or password.');

        if (user.source.value !== "local") return done(`Email is associated with a ${user.source.value} account.`);

        const isValid = validPassword(password, user.hash, user.salt);

        if (isValid) {
            return done(null, user);
        } else {
            return done('Incorrect email or password.');
        }
    });
}


export const localStrategy = new LocalStrategy(customfields, verifyCallback);
