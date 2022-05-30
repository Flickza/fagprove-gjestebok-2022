
export const loginOptionsView = (req, res) => {
    try {
        res.render("../views/auth/auth.ejs", { root: "./" });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const loginView = (req, res) => {
    try {
        res.render('../views/auth/login.ejs', { root: './' });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const registerView = (req, res) => {
    try {
        res.render('../views/auth/register.ejs', { root: './' });
    } catch (error) {
        res.json({ message: error.message });
    }
}

