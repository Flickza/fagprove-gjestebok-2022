export const home = (req, res) => {
    try {
    res.render("../views/index.ejs", { root: "./" });
    } catch (error) {
    res.status(404).json({ message: error.message });
    }    
}