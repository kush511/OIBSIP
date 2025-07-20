import mongoose, { Schema } from "mongoose";


const OrderSchema = new Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "users",
  },
  pizzaType: {
    type: String,
    enum: ["custom", "standard"],
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  pizzaRef: {
    type: mongoose.Schema.ObjectId,
    required: true,
    refPath: "pizzaModelType",
  },
  pizzaModelType: {
    type: String,
    required: true,
    enum: ["custompizzas", "allpizzas"],
  },
  status: {
    type: String,
    enum: ["proceed","working","completed"],
    default:"proceed",
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending'
  }
});


export const OrderModel = mongoose.model("orders",OrderSchema)