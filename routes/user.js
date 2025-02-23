
// const express = require("express")
// const Router = express.Router()
const bcrypt = require("bcrypt")
const { Router } = require("express")
const { userModel } = require("../db")
const userRouter = Router()
const { z } = require("zod")
const jwt = require("jsonwebtoken")
const { JWT_USER_PASSWORD } = require("../config")

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

    const email = req.body.email
    const password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName
        
    const hashedPassword = await bcrypt.hash(password,  5)
    console.log(hashedPassword)
        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })
    } catch (error) {
        return res.json({ message : "User already exists"})
    }

        return res.json({
            msg : "You are signed up"
        })
    // }
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

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password is required" })
    }

    try {

    let user = await userModel.findOne({ email })
    if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
    }
    // if (user && await bcrypt.compare(password, user.password)) {
    //     let token = jwt.sign({ email, id: user._id.toString() }, JWT_USER_PASSWORD)

    //     // TODO: Need to add Cookie based authentication

    //     return res.status(200).json({ token, user })
    // }
    // else {
    //     return res.status(400).json({ error: "Invaild credentials" })
    // }
    const passwordMatch = await bcrypt.compare(password, user.password)
    
    if (passwordMatch) {
        let token = jwt.sign({
            email,
            id : user._id.toString()
        }, JWT_USER_PASSWORD,
        { expiresIn: "1h" })
        
        return res.status(200).json({ token, user });
    }

} catch (error) {
    console.error("Error during signin:", error);
    return res.status(500).json({ message: "Internal server error" });
}    
})



    userRouter.get("/purchases", (req, res) => {
    return res.json({
        msg : "Signin successful"
    })
})



module.exports = {
    userRouter

}


