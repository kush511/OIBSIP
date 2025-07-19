import { isValidObjectId } from "mongoose";
import { CustomPizzaModel } from "../models/CustomPizzaModel.js";
import { OrderModel } from "../models/OrderModel.js";
import { PizzaModel } from "../models/PizzaModel.js";
import mongoose from "mongoose";



export const allPizzas = async(req,res)=>{
  const userId = req.userId
  console.log(userId);
  
    const pizzas = await PizzaModel.find()
    console.log(pizzas);
    
   if (pizzas) {
     return res.json({
      pizzas:pizzas
    })
   }
   
     res.status(500).json({ message: 'Error fetching pizzas' });
  
}


export const customPizza = async (req,res)=>{
    const {userId,role}= req.userId
    
    
    const {base,sauce,cheese,veggies} = req.body;
 try {
     const createdPizza = await CustomPizzaModel.create({
        base,
        sauce,
        veggies,
        cheese,
        userId
    })
    res.json({
        message:"You pizza is done customising",
        createdPizza
    })
 } catch (error) {
    res.status(403).json({
        message:"Error creating your customised pizza"
    })
 }
}

export const myCustomPizzas = async (req,res)=>{
    const userId = req.userId;
    console.log(userId);
    

  
     const mypizzas =  await CustomPizzaModel.find({
        userId
    },)
    console.log(mypizzas);
    

   if (mypizzas) {
    return res.json({
        message:"Your special pizzas",
        mypizzas
    })
   }
   
    res.status(400).json({
        message:"Error fetching your customised pizzas"
    })
  
} 

export const addOrder = async(req,res)=>{
try {
    const {userId,role} = req.userId
        const {pizzaType,totalPrice,pizzaRef} = req.body
    
    
      const order =  await OrderModel.create({
            userId,
            pizzaRef,
            pizzaModelType:pizzaType==="custom"?"custompizzas":"allpizzas",
            pizzaType,
            totalPrice,
        })

        res.json({
            message:"Order placed",
            order
        })
} catch (error) {
    res.status(500).json({ message: "Something went wrong while placing the order" });
}
}

export const getMyOrders =async (req,res)=>{
    const {userId,role} = req.userId
    const ObjUserId = new mongoose.Types.ObjectId(userId)
   
    
const orderByUser = await OrderModel.find({userId: ObjUserId})

.populate('pizzaRef')


res.json({
    orderByUser
})
   
}