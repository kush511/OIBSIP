import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import AuthRouter from "./routes/userRoute.js"
import allPizzaRouter from "./routes/allPizzaRoute.js"
import adminRouter from "./routes/adminRoutes.js"
import paymentRouter from "./routes/paymentRoutes.js"
import cron from "node-cron"
import axios from "axios"

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/auth", AuthRouter)
app.use("/pizza", allPizzaRouter)
app.use("/admin", adminRouter)
app.use("/api/payment", paymentRouter)

// Health route for cron ping
app.get("/", (req, res) => {
  res.send("Server is awake!");
})

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("db connected"))
  .catch((error) => console.log("issue: " + error))

// Ping Render backend every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  try {
    const response = await axios.get("https://oibsip-sqy7.onrender.com/");
    console.log(`Health check: ${response.status}`);
  } catch (err) {
    console.error("Health check failed:", err.message);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
