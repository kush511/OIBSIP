import { OrderModel } from "../models/OrderModel.js";
import { PizzaModel } from "../models/PizzaModel.js";
import { CustomPizzaModel } from "../models/CustomPizzaModel.js";
import { InventoryModel } from "../models/InventoryItemModel.js";

export const processPayment = async (req, res) => {
    try {
        const { orderId } = req.body;

        const order = await OrderModel.findById(orderId);
        const pizzaType = order.pizzaType;
        const pizzaRef = order.pizzaRef;
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.paymentStatus === 'success') {
            return res.status(400).json({
                message: "order already paid"
            })
        }

        const paymentSuccess = Math.random() > 0.1;

        // fetch from appropriate model based on pizza type
        let pizzaDoc;
        if (pizzaType === "custom") {
            pizzaDoc = await CustomPizzaModel.findById(pizzaRef);
        } else {
            pizzaDoc = await PizzaModel.findById(pizzaRef);
        }

        if (!pizzaDoc) {
            return res.status(404).json({ message: "Pizza not found" });
        }

        const { base, sauce, cheese, veggies } = pizzaDoc;
        if (paymentSuccess) {
            // decrement inventory for base, sauce, cheese, and each veggie
            const inventoryUpdates = [
                InventoryModel.findOneAndUpdate(
                    { name: base, category: "Base" },
                    { $inc: { quantity: -1 } }
                ),
                InventoryModel.findOneAndUpdate(
                    { name: sauce, category: "Sauce" },
                    { $inc: { quantity: -1 } }
                ),
                InventoryModel.findOneAndUpdate(
                    { name: cheese, category: "Cheese" },
                    { $inc: { quantity: -1 } }
                ),
                // handle veggies array
                ...veggies.map(v =>
                    InventoryModel.findOneAndUpdate(
                        { name: v, category: "Veggie" },
                        { $inc: { quantity: -1 } }
                    )
                ),
            ];
            await Promise.all(inventoryUpdates);

            order.paymentStatus = 'success';
            order.status = 'working'; 
            await order.save();

            res.json({
                success: true,
                message: "Payment successful!",
                orderId: orderId
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Payment processing error"
        })
    }
}