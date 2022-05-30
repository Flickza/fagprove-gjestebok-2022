import { genPassword } from "../../config/validate/passwordUtils.js";

export const newLocalUser = (user) => {
    const saltHash = genPassword(user.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const User = new User({
        email: {
            value: user.email,
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

    return User;
}