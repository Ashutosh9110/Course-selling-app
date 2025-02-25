const {Router} = require("express")
const { userMiddleware } = require("../middleware/user")


const courseRouter = Router()


courseRouter.post("/purchases", userMiddleware, async (req, res) => {

    


    return res.json({ msg : "purchases made"})

})


courseRouter.get("/purchases", (req, res) => {

    return res.json({ msg : "These are your purchases"})

})




module.exports = {
    courseRouter
}



