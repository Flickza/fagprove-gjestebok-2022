export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.json({ success: false, message: 'You must be logged in to perform this action!' });
    }
}

export const alreadyAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    } else {
        return next();
    }
}
