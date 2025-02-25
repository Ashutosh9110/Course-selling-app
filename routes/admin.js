const bcrypt = require("bcrypt")
const { Router } = require("express")
const { adminModel, courseModel } = require("../db")
const { z } = require("zod")
const jwt = require("jsonwebtoken")
const { JWT_ADMIN_PASSWORD } = require("../config")
const { adminMiddleware } = require("../middleware/admin")
const adminRouter = Router()


adminRouter.post("/signup", async function (req, res) {

        const requireBody = z.object({
        email : z.string().trim().email({ message: "Please enter a valid email address"}),
        password : z.string({ message: "Password is required"})
            .min(3, { message: "Password must be at least 3 characters "})
            .max(20, { message: "Password must not exceed 20 characters" })
            .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { message: "Password must contain at least one special character" })
            .regex(/[A-Z]/, { message : "Password must have at least one upper case character"}),
        // confirmPassword : z.string(),
        firstName : z.string().min(3, { message: "First name must be at least 3 characters" }).max(100),
        lastName : z.string().min(3, { message: "Last name must be at least 3 characters" }).max(100)
    
    })
    
        // const parsedData = requireBody.parse(req.body)
        const parsaDataWithSuccess = requireBody.safeParse(req.body)
    
        if(!parsaDataWithSuccess.success) {
            return res.status(400).json({ 
                message: "Validation failed",
                errors: parsaDataWithSuccess.error.flatten().fieldErrors // Extracting error messages properly
            });
        }
    
        // let errorThrown = false
        try {
    
        const { email, password, firstName, lastName } = req.body;
    
        const existingadmin = await adminModel.findOne({ email });
            if (existingadmin) {
                return res.status(400).json({ message: "admin already exists" });
            }
    
        const hashedPassword = await bcrypt.hash(password,  10)
        console.log(hashedPassword)
        const newadmin = await adminModel.create({
                email,
                password: hashedPassword,
                firstName,
                lastName
            })
    
            let token = jwt.sign({ email, id: newadmin._id.toString() }, JWT_ADMIN_PASSWORD, { expiresIn: "1h" })
            // console.log(newadmin._id.toString())
            res.status(201).json({
                token,
                // admin: newadmin,
                msg: "You are signed up successfully"
            });
    
        } catch (error) {
            console.error("Error during signup:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    
            
    })
    


adminRouter.post("/signin", async (req, res) => {


        const requireBody = z.object({
            email : z.string().trim().email({ message: "Please enter a valid email address"}),
            password : z.string({ message: "Password is required"})
                .min(3, { message: "Password must be at least 3 characters"})
                .max(20, { message: "Password must not exceed 20 characters" })
                .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { message: "Password must contain at least one special character" })
                .regex(/[A-Z]/, { message : "Password must have at least one upper case character"}),
    
        })
        
            const parsaDataWithSuccess = requireBody.safeParse(req.body)
        
            if(!parsaDataWithSuccess.success) {
                return res.status(400).json({ 
                    message: "Validation failed",
                    errors: parsaDataWithSuccess.error.flatten().fieldErrors 
                });
            }
    
        const { email, password }  = req.body
    
        try {
    
        const admin = await adminModel.findOne({ email })
        if (!admin) {
            return res.status(400).json({ error: "admin not in the database" });
        }
        const passwordMatch = await bcrypt.compare(password, admin.password)
        
        if (!passwordMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
    
            // TODO: Need to add Cookie based authentication
     
            let token = jwt.sign({
                email,
                id : admin._id.toString()
            }, JWT_ADMIN_PASSWORD,
            { expiresIn: "1h" })
            
            return res.status(200).json({ message : "You are signed in", token });
        
    
        } catch (error) {
            console.error("Error during signin:", error);
            return res.status(500).json({ message: "Internal server error" });
        }    
        })




adminRouter.post("/course", adminMiddleware, async (req, res) => {

    const adminId = req.adminId

    const { title, description, price, imageUrl } = req.body

    // TODO: Build a pipeline for admin to upload images.

    const course = await courseModel.create({
        title, description, price, imageUrl, creatorId: adminId 
    })

    return res.json({
        message : "Course Created",
        courseId : course._id
    })
})


adminRouter.put("/course", adminMiddleware, async (req, res) => {

    const adminId = req.adminId

    const { title, description, price, imageUrl, courseId } = req.body

    // TODO: Build a pipeline for admin to upload images.


    try {
        const course = await courseModel.findOne({ _id: courseId })

        if(!course) {
            return res.status(404).json({ message: "Course not found"})
        }
        if(course.creatorId.toString() !== adminId) {
            return res.status(403).json({ message : "Not your course"})
        }
    

    await courseModel.updateOne({
       _id: courseId
    } , {
        title, description, price, imageUrl, 
    })

    return res.status(200).json({ message: "Course updated successfully" });

    } catch (err) {
        console.error("Error updating course:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})


adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {

    const adminId = req.adminId

    const courses = await courseModel.find({
       creatorId: adminId,
    })

    return res.json({
        courses
    })

})



module.exports = {
    adminRouter
}
