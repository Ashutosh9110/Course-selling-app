require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")

// TODO: Login with GOOGLE and GITHUB


const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/course")
const { adminRouter } = require("./routes/admin")
const { MONGO_URL } = require("./config")


const app = express()
app.use(express.json())
const PORT = 3002


app.use("/api/v1/user", userRouter)
app.use("/api/v1/course", courseRouter)
app.use("/api/v1/admin", adminRouter)


async function main() {

    
    await mongoose.connect(MONGO_URL)   
    app.listen(`${PORT}`)
    console.log(`App is listening at ${PORT}`)

}

main()
