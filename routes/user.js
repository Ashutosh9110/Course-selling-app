
// const express = require("express")
// const Router = express.Router()
const bcrypt = require("bcrypt")
const { Router } = require("express")
const { userModel } = require("../db")
const userRouter = Router()
const { z } = require("zod")
const jwt = require("jsonwebtoken")
const { JWT_USER_PASSWORD } = require("../config")
const { userMiddleware } = require("../middleware/user")

userRouter.post("/signup", async (req, res) => {

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

    const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

    const hashedPassword = await bcrypt.hash(password,  10)
    console.log(hashedPassword)
    const newUser = await userModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        })

        let token = jwt.sign({ email, id: newUser._id.toString() }, JWT_USER_PASSWORD, { expiresIn: "1h" })
        res.status(201).json({
            token,
            // user: newUser,
            msg: "You are signed up successfully"
        });

    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }

        
})




userRouter.post("/signin", async (req, res) => {


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

    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(400).json({ error: "User not in the database" });
    }
 

    const passwordMatch = await bcrypt.compare(password, user.password)
    
    if (!passwordMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
    }

        // TODO: Need to add Cookie based authentication
 
        const token = jwt.sign({
            email,
            id : user._id.toString()
        }, JWT_USER_PASSWORD,
        { expiresIn: "1h" })
        
        return res.status(200).json({ message : "You are signed in", token });
    

    } catch (error) {
        console.error("Error during signin:", error);
        res.status(500).json({ message: "Internal server error" });
    }    
    })







    userRouter.get("/purchases", userMiddleware, async (req, res) => {

        const { email, passsword } = req.body

        const user = await userModel.findOne({ email })

        if (!user) {
            res.status(400).json({ message : "User not found"})
        }

        const purchases = await userModel.find({ 
            ._id = course
        })


    return res.json({
        msg : "Signin successful"
    })
})



module.exports = {
    userRouter

}


