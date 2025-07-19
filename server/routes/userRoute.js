import express from "express"
import { loginUser, registerUser, verifyEmail } from "../controllers/authController.js"
import validate from "../middlewares/validate.js"

const AuthRouter = express.Router()

AuthRouter.post("/register",validate,registerUser)
AuthRouter.post("/login",loginUser)
AuthRouter.get("/verify-email", verifyEmail);
export default AuthRouter