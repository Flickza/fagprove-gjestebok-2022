export const home = (req, res) => {
    try {
        res.render("../views/home/index.ejs", { root: "./" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}