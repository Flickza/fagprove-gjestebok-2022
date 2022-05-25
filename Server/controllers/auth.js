export const authScreen = (req, res) => {
    try {
        res.render("../views/auth.ejs", { root: "./" });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const googleAuthCallback = (req, res) => {

}

export const googleAuth = (req, res) => {

}