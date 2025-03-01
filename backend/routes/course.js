const {Router} = require("express")
const { userMiddleware } = require("../middleware/user")
const { purchaseModel, courseModel } = require("../db")

const courseRouter = Router()


courseRouter.post("/purchase", userMiddleware, async (req, res) => {

    const userId = req.userId
    const courseId = req.body.courseId
    
// TODO: put a check to send a message a user purchase the same course twice

    await purchaseModel.create({
        userId,
        courseId
    })

    return res.json({ msg : "You have bought the course"})

})


courseRouter.get("/preview", async (req, res) => {

    const courses = await courseModel.find({})

    return res.json({
        courses
    })


    return res.json({ msg : "These are your purchases"})

})




module.exports = {
    courseRouter
}



