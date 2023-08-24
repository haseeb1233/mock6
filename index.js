const express = require("express")
const cors=require("cors")
const app=express()
const {connection}=require("./db")
const {userRoute}=require("./routes/user.route")
const {blogRoute}=require("./routes/blog.route")
require("dotenv").config()
app.use(express.json())
app.use(cors())
app.use("/api",userRoute)
app.use("/api",blogRoute)






app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to database")
    } catch (error) {
        console.log(error)
    }
    console.log("server is connected")
})