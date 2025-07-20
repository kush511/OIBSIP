import express from "express"
import AuthMiddleware from "../middlewares/authMiddleware.js"
import { getPaymentStatus, processPayment } from "../controllers/paymentController.js"


 const paymentRouter = express.Router()

paymentRouter.post("/process",AuthMiddleware,processPayment)
paymentRouter.get("/check-status/:orderId",AuthMiddleware,getPaymentStatus)
export default paymentRouter