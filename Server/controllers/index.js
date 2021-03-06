export const home = (req, res) => {
    try {
        if (req.user) {
            //set ejs global variable if user is logged in
            const user = { id: req.user._id, email: req.user.email.value, displayName: req.user.displayName, isAdmin: req.user.admin };

            res.render("../views/home/index.ejs", { user: user, root: "./" });
        } else {
            res.render("../views/home/index.ejs", { user: false, root: "./" });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}