import GoogleStrategy from 'passport-google-oauth20';
import User from '../../models/User.js';
import dotenv from 'dotenv';
import { newGoogleUser } from '../../models/user/newGoogleUser.js';

//import environment
dotenv.config();


export const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URI,
    passReqToCallback: true
}, (request, accessToken, refreshToken, profile, done) => {
    User.findOne({ "email.value": profile.emails[0].value.toLowerCase(), "source.ids.googleId": profile.id }, (err, user) => {
        if (err) return done(err);
        if (user === null) {
            //create model of Google user
            const newUser = newGoogleUser(profile);
            //save user
            newUser.save((err, user) => {
                if (err) return done(err);
                //continue with user
                return done(null, user);
            });
        }
        if (user) return done(null, user);
    });
});
