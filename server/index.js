const express = require("express")
const cors = require("cors");
const { connectToDB } = require("./database/db.connection.js");
const { router } = require("./routes/user.route.js");
const dotenv = require("dotenv")
dotenv.config()
const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded())
app.use((req,res,next)=>{ //app level middleware
    console.log("this is custom(app) level middleware")
    req.myData="custom request property "
    next()
})
app.use("/hello",(_,_,next)=>{ //path level middleware
    console.log("path level hello")
},(req,res)=>{
    res.send("hello response send")
}) 
app.use("/user",router)

connectToDB().then(
app.listen(process.env.PORT,()=>{
    console.log("server is listening on  http://localhost:9999/ ")
})
)
