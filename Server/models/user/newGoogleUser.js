import User from '../User.js';

export const newGoogleUser = (profile) => {
    try {
        const GOOGLE_USER = profile;
        const user = new User({
            email: {
                value: GOOGLE_USER.emails[0].value,
                verified: GOOGLE_USER.emails[0].verified
            },
            displayName: GOOGLE_USER.displayName,
            firstName: GOOGLE_USER.name.givenName,
            lastName: GOOGLE_USER.name.familyName,
            profilePhoto: GOOGLE_USER.photos[0].value,
            source: {
                value: GOOGLE_USER.provider,
                ids: {
                    googleId: GOOGLE_USER.id
                },
            },
        });

        return user;
    } catch (error) {
        return new Error(error.message);
    }
}