const jwt = require("jsonwebtoken")
const JWT_ADMIN_PASSWORD = require("../config")


function adminMiddleware (req, res, next) {

    const token = req.params.token
    const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD)

    if (decoded) {
        req.userId = decoded.id
        next()
    } else {
        console.log("Wrong credentials")
    }
}

module.exports = {
    adminMiddleware
}