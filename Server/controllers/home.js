export const home = (req, res) => {
    try {
        console.log(req.user);
        res.render("../views/home/index.ejs", { user: req.user, root: "./" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}