import mongoose, { Schema } from "mongoose";

const pizzaSchema = new Schema({
   title:{type:String,required:true},
    image:{type:String},
    price:{type:Number,required:true},
    desc:{type:String}
})

export const PizzaModel = mongoose.model("allpizzas",pizzaSchema)