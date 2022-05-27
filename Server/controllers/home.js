export const home = (req, res) => {
    try {
        if (req.user) {
            const user = {
                id: req.user._id,
                email: req.user.email,
                firstName: req.user.firstName,
                lastName: req.user.lastName
            };
            res.render("../views/home/index.ejs", { user: user, root: "./"});
        } else {
            res.render("../views/home/index.ejs", { user: false, root: "./"});
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}