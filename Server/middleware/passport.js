import passport from 'passport';
import User from '../models/User.js';
import { googleStrategy } from './Strategies/googleStrategy.js';
import { localStrategy } from './Strategies/localStrategy.js';

passport.use(googleStrategy);
passport.use(localStrategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((userId, done) => {
    User.findOne({
        $or: [{ _id: userId }, { "source.ids.googleId": userId }]
    },
    (err, user) => {
        done(err, user);
    });
});