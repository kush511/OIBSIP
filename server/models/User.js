import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    username:{type:String,maxLength:20,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    role:{type:String,default:"user"},
    isVerified:{type:Boolean,default:false},
},{timestamps:true})

UserSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

const UserModel = mongoose.model("users",UserSchema)

export default UserModel;