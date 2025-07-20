
import mongoose, { Schema } from "mongoose";

const CustomPizzaSchema = new Schema({
    userId: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
   
    base: { type: String, required: true },
    sauce: { type: String, required: true },
    cheese: { type: String, required: true },
    veggies: [String],
}, {
    timestamps: true
})

export const CustomPizzaModel = mongoose.model("custompizzas", CustomPizzaSchema)