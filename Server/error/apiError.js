//error middleware for api
export const apiError = (err, req, res, next) => {
    //if error doesnt contain a status code or message, send default
    if (!err.statusCode || !err.message) {
        return res.status(500).json({ success: false, statusCode: 500, message: "Something went wrong." });
    } else {
        //return error
        return res.status(err.statusCode).json({ success: false, statusCode: err.statusCode, message: err.message }); 
    }
}