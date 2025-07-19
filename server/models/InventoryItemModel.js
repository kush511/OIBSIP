import mongoose, { mongo, Schema } from "mongoose";

const InventorySchema = new Schema({
name:{
    type:String,
    required:true
},
category:{
    type:String,
    enum:["Base", "Sauce", "Cheese", "Veggie"],
    required:true
},
quantity:{
    type:Number,
    required:true,
    default:0
},
threshold: {
    type: Number,
    required: true,
    default: 10, 
  }
})

export const InventoryModel = mongoose.model("inventory",InventorySchema)