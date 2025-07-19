import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import AuthRouter from "./routes/userRoute.js"
import allPizzaRouter from "./routes/allPizzaRoute.js"
import adminRouter from "./routes/adminRoutes.js"

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())


app.use("/api/auth",AuthRouter)
app.use("/pizza",allPizzaRouter)
app.use("/admin",adminRouter)

mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("db connected"))
.catch((error)=> console.log("issue :"+ error))

app.listen(3000)
