export const apiError = (err, req, res, next) => {
    if (!err.statusCode || !err.message) {
        res.status(500).json({ success: false, statusCode: 500, message: "Something went wrong." });
    } else {
        res.status(err.statusCode).json({ success: false, statusCode: err.statusCode, message: err.message }); 
    }
    next();
}