import express from "express"
import AuthMiddleware from "../middlewares/authMiddleware.js"
import { processPayment } from "../controllers/paymentController.js"


 const paymentRouter = express.Router()

paymentRouter.post("/process",AuthMiddleware,processPayment)

export default paymentRouter