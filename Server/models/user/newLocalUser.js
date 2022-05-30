import { genPassword } from "../../config/validate/passwordUtils.js";
import User from '../User.js';

export const newLocalUser = (user) => {
    const saltHash = genPassword(user.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        email: {
            value: user.email.toLowerCase(),
            verified: false
        },
        displayName: user.firstName + " " + user.lastName,
        firstName: user.firstName,
        lastName: user.lastName,
        source: {
            value: "local"
        },
        hash: hash,
        salt: salt
    });

    return newUser;
}