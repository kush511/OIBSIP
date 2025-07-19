import { CustomPizzaModel } from "../models/CustomPizzaModel.js"
import { InventoryModel } from "../models/InventoryItemModel.js"
import { OrderModel } from "../models/OrderModel.js"
import { PizzaModel } from "../models/PizzaModel.js"


export const addPizza = async(req,res)=>{

const {price,title,desc,image} = req.body
    
    try {
        await PizzaModel.create({
        price,
        title,
        image,
        desc
    })
    res.json({
        message:"New pizza added in public section"
    })
    } catch (error) {
        res.status(401).json({
            message:error
        })
    }
}

export const seeCustomPizzas = async (req,res)=>{

  try {
     const allCustomPizzas =  await CustomPizzaModel.find()

     res.json({
        message:"All the custom pizza orders are :",
        allCustomPizzas
     })
  } catch (error) {
    res.status(403).json({
        message:error
    })
  }

}

export  const getInventory = async (req,res)=>{
    try {
      const allItems =  await  InventoryModel.find({}, { name:1,quantity:1,category:1 ,_id:0})

      res.json({
        message:"Here are all the quantites and categories",
        allItems
      })
    } catch (error) {
        res.status(401).json({
            message:"Error getting "+ error
        })
    }
}

export const addItem = async(req,res) =>{
const {name,quantity,category,threshold}=req.body;

try {
    await InventoryModel.create({
    name,
    quantity,
    category,
    threshold
})
res.json({
    message:"New item added"
})
} catch (error) {
    res.status(401).json({
        message:"Error adding item to db"
    })
}
}

export const manualUpdate = async (req,res)=>{

   try {
     const {name,quantity} = req.body;
    const updateFields = {}

    if(name) updateFields.name = name;
    if( quantity !== undefined) updateFields.quantity = quantity


    const updatedItem = await InventoryModel.findByIdAndUpdate(req.params.id,
         { $set: updateFields },
      { new: true }
    )

    if(!updatedItem){
        return res.status(500).json({
            message:"Item not found"
        })
    }
    res.json({
        message:"Item successfully updated",
        updatedItem
    })
   } catch (error) {
    res.json({
        message:"Some error occured while updating items manually" + error
    })
   }
}

export const allOrders = async (req,res)=>{
    try {
      const allOrders =  await OrderModel.find()
      .populate('pizzaRef')
      .populate('userId', 'username email');
      res.json({
        message:"All orders from users are:",
        allOrders
      })
    } catch (error) {
        res.status(500).json({
            message:"error fetching all orders"
        })
    }
}

export const changeStatus = async (req,res)=>{
 
 try {
     const status = req.body.status;
    await OrderModel.findByIdAndUpdate(req.params.id,
    {$set:{status}},
    {new:true})
    res.json({
        message:"Status updated to:",
        status
    })
 } catch (error) {
    res.status(404).json({
        message:"Error updating status"
    })
 }
  
}

export const updatePizzaForPublic = async(req,res)=>{
const {title,image,price,desc} = req.body

try {
    const updatedItem = {}

if(title) updatedItem.title = title
if(image) updatedItem.image = image
if(price!=undefined) updatedItem.price = price
if(desc) updatedItem.desc = desc

const updatedPizza = await PizzaModel.findByIdAndUpdate(req.params.id,
    {$set:updatedItem},
    {new:true}
)
 if (!updatedPizza) {
      return res.status(404).json({ message: "Pizza not found" });
    }
 
res.json({
    updatedItem,
    message:"Got updated"
})
} catch (error) {
    res.status(500).json({
        message:"Error updating Public Pizza "
    })
}

}

export const deletePizzaFromPublic = async (req,res)=>{
    
    try {
        await PizzaModel.findByIdAndDelete(req.params.id)

        res.json({
            
            message:"Pizza deleted"
        })
    } catch (error) {
        error
    }

}
