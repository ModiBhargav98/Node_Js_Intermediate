const ErrorHander = require("../utils/errorhander")

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal Server Error"
    console.log(err)
    // Wrong mongodb id err
    if (err.name === "castError"){
        const message = `Resource not found Invalid: ${err.path}`
        err = new ErrorHander(message,400)
    }
    res.status(err.statusCode).json({
        success:false,
        message :err.message
    })
}