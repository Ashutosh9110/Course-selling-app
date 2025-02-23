const { Router } = require("express")
const { adminModel } = require("../db")

const adminRouter = Router()


adminRouter.post("/signup", (req, res) => {
    return res.json({
        msg : "Admin signed up"
    })
})

adminRouter.post("/signin", (req, res) => {
    return res.json({
        msg : "Admin signed in"
    })
})

adminRouter.post("/", (req, res) => {
    return res.json({
        msg : "Admin courses"
    })
})

adminRouter.get("/bulk", (req, res) => {
    return res.json({
        msg : "Admin courses"
    })
})


adminRouter.put("/", (req, res) => {
    return res.json({
        msg : "Admin courses"
    })
})


module.exports = {
    adminRouter
}
