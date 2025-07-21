
import UserModel from "../models/User.js";
import getToken from "../utils/getToken.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/sendEmail.js";


export const registerUser = async (req, res) => {
    const { email, username } = req.body;
    const password = req.password
    const existing = await UserModel.findOne({ email })

    
    if (existing) return res.status(400).json({ message: "User already exists" })

   const user =  await UserModel.create({
        email,
        username,
        password
    })
    res.json({
      message:"Signup done"
    })

    // const token = getToken({userId:user._id})

    // await sendEmail(user.email,token)

    // return res.status(200).json({ message: "Please check your email to verify your account" });
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    
    // Check if user exists first
    if (!user) {
        return res.status(403).json({
            message: "Invalid credentials"
        });
    }

    const isMatching = await user.comparePassword(password);

    if (!isMatching) {
        return res.status(403).json({
            message: "Invalid credentials"
        });
    }

    const token = getToken({userId: user._id.toString(), role: user.role});

    return res.json({
        token: token
    });
}




export const verifyEmail = async (req, res) => {
  try {
    const token = req.query.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findByIdAndUpdate(decoded.userId, {
      isVerified: true
    });

    return res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

