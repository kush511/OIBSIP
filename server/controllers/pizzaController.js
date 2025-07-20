import { CustomPizzaModel } from "../models/CustomPizzaModel.js";
import { OrderModel } from "../models/OrderModel.js";
import { PizzaModel } from "../models/PizzaModel.js";
import mongoose from "mongoose";
import { InventoryModel } from "../models/InventoryItemModel.js";



export const allPizzas = async (req, res) => {
    const userId = req.userId
    console.log(userId);

    const pizzas = await PizzaModel.find()
    console.log(pizzas);

    if (pizzas) {
        return res.json({
            pizzas: pizzas
        })
    }

    res.status(500).json({ message: 'Error fetching pizzas' });

}


export const customPizza = async (req, res) => {
    const { userId, role } = req.userId


    const { base, sauce, cheese, veggies } = req.body;
    try {
        const createdPizza = await CustomPizzaModel.create({
            base,
            sauce,
            veggies,
            cheese,
            userId
        })
        res.json({
            message: "You pizza is done customising",
            createdPizza
        })
    } catch (error) {
        res.status(403).json({
            message: "Error creating your customised pizza"
        })
    }
}

export const myCustomPizzas = async (req, res) => {
    const userId = req.userId;
    console.log(userId);



    const mypizzas = await CustomPizzaModel.find({
        userId
    },)
    console.log(mypizzas);


    if (mypizzas) {
        return res.json({
            message: "Your special pizzas",
            mypizzas
        })
    }

    res.status(400).json({
        message: "Error fetching your customised pizzas"
    })

}
export const addOrder = async (req, res) => {
    try {
        const { userId, role } = req.userId;
        const { pizzaType, totalPrice, pizzaRef } = req.body;

        const order = await OrderModel.create({
            userId,
            pizzaRef,
            pizzaModelType: pizzaType === "custom" ? "custompizzas" : "allpizzas",
            pizzaType,
            totalPrice,
        });

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

        // check inventory availability before placing order
        const ingredientsToCheck = [
            { name: base, category: "Base" },
            { name: sauce, category: "Sauce" },
            { name: cheese, category: "Cheese" },
            ...veggies.map(v => ({ name: v, category: "Veggie" }))
        ];
        for (const item of ingredientsToCheck) {
            const inv = await InventoryModel.findOne({ name: item.name, category: item.category });
            if (!inv || inv.quantity <= 0) {
                return res.status(400).json({ message: `${item.name} is out of stock` });
            }
        }

        return res.json({
            message: "Order created. Proceed to payment.",
            order: {
                id: order._id,
                totalPrice: order.totalPrice,
                status: order.status
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong while placing the order" });
    }
};



export const getMyOrders = async (req, res) => {
    const { userId, role } = req.userId
    const ObjUserId = new mongoose.Types.ObjectId(userId)


    const orderByUser = await OrderModel.find({ userId: ObjUserId })

        .populate('pizzaRef')


    res.json({
        orderByUser
    })

}