const mongoose = require("mongoose")
// console.log("Conntect to database")
// mongoose.connect("mongodb+srv://venividivici:weDrGVvFIUh1ZsE0@cluster0.e1dex.mongodb.net/system-app")
const ObjectId = mongoose.Types.ObjectId
// const { z } = require("zod")


const Schema = mongoose.Schema
const userSchema = new Schema({

        email : { type: String, unique: true },
        password : String,
        // confirmPassword : String,
        firstName : String,
        lastName : String
    })
    // .refine((data) => data.password === data.confirmPassword, { message: "Passwords don't match"})

const adminSchema = new Schema({
    email : { type: String, unique: true },
    password : String,
    // confirmPassword : String,
    firstName : String,
    lastName : String
    })

const courseSchema = new Schema({
        title : String,
        description : String,
        price : Number,
        imageUrl : String,
        creatorId : ObjectId // this line here is a reference where creatorId has a reference to an entry in adminSchema..this would mean that only an admin can create a course..

    })

const purchaseSchema = new Schema({
        userId : ObjectId,
        courseId : ObjectId


    })


//TODO: there should be another schema for the course content...that is video no: 1, 2, 3.


const userModel = mongoose.model("user", userSchema)
const adminModel = mongoose.model("admin", adminSchema)
const courseModel = mongoose.model("course", courseSchema)
const purchaseModel = mongoose.model("purchase", purchaseSchema)


module.exports = {
    userModel, adminModel, courseModel, purchaseModel
}