import {z} from "zod"
import bcrypt from "bcryptjs";

const registerSchema =  z.object({
    username:z.string().min(4).max(12),
    email:z.email(),
        password:z.string().min(4).max(14)
})

export default async function validate(req,res,next){

   const result = registerSchema.safeParse(req.body)
    console.log(result);
    
   if(!result.success){
   return res.status(401).json({
        message:"Invalid format"
    })
   }
  // Hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 8);
  req.password = hashedPassword;
   console.log(hashedPassword);
   
  next();
}