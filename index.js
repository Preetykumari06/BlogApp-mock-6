const express=require("express")
const cors=require("cors")
const {connection}=require("./Config/db")
const { userRouter } = require("./Routes/User.route")
const { blogRouter } = require("./Routes/Blog.route")

require('dotenv').config()

const app=express()
app.use(express.json())
app.use(cors())


app.get("/", async(req,res)=>{
    return res.status(200).send({message:"Hello, Welcome in the Blog App"})
})

app.use("/",userRouter)
app.use("/",blogRouter)

app.listen(process.env.port, async()=>{
    try{
        await connection
        console.log("Connected to the DB.")
    }catch(error){
        console.log(error.message)
    }
    console.log(`Server is running on port ${process.env.port}`)
})