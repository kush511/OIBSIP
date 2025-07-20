import mongoose, { Schema } from "mongoose";

const pizzaSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    desc: { type: String },
    base: { type: String, required: true },
    sauce: { type: String, required: true },
    cheese: { type: String, required: true },
    veggies: [String],
})

export const PizzaModel = mongoose.model("allpizzas", pizzaSchema)