import { CustomPizzaModel } from "../models/CustomPizzaModel.js"
import { InventoryModel } from "../models/InventoryItemModel.js"
import { OrderModel } from "../models/OrderModel.js"
import { PizzaModel } from "../models/PizzaModel.js"
import { getLowStockItems } from "../utils/getInventoryHelp.js"


export const addPizza = async (req, res) => {

    const { price, title, desc, image, sauce, base, cheese, veggies } = req.body

    try {
        await PizzaModel.create({
            price,
            title,
            image,
            desc,
            sauce,
            base,
            cheese,
            veggies
        })
        res.json({
            message: "New pizza added in public section"
        })
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

export const seeCustomPizzas = async (req, res) => {

    try {
        const allCustomPizzas = await CustomPizzaModel.find()

        res.json({
            message: "All the custom pizza orders are :",
            allCustomPizzas
        })
    } catch (error) {
        res.status(403).json({
            message: error
        })
    }

}

export const getInventory = async (req, res) => {
    try {
        const allItems = await InventoryModel.find({}, { name: 1, quantity: 1, category: 1, _id: 0 })

        res.json({
            allItems
        })
    } catch (error) {
        res.status(401).json({
            message: "Error getting " + error
        })
    }
}

export const addItem = async (req, res) => {
    const { name, quantity, category, threshold } = req.body;

    try {
        await InventoryModel.create({
            name,
            quantity,
            category,
            threshold
        })
        res.json({
            message: "New item added"
        })
    } catch (error) {
        res.status(401).json({
            message: "Error adding item to db"
        })
    }
}

export const manualUpdate = async (req, res) => {

    try {
        const { name, quantity } = req.body;
        const updateFields = {}

        if (name) updateFields.name = name;
        if (quantity !== undefined) updateFields.quantity = quantity


        const updatedItem = await InventoryModel.findByIdAndUpdate(req.params.id,
            { $set: updateFields },
            { new: true }
        )

        if (!updatedItem) {
            return res.status(500).json({
                message: "Item not found"
            })
        }
        res.json({
            message: "Item successfully updated",
            updatedItem
        })
    } catch (error) {
        res.json({
            message: "Some error occured while updating items manually" + error
        })
    }
}

export const allOrders = async (req, res) => {
    try {
        const allOrders = await OrderModel.find()
            .populate('pizzaRef')
            .populate('userId', 'username email');
        res.json({
            allOrders
        })
    } catch (error) {
        res.status(500).json({
            message: "error fetching all orders"
        })
    }
}

export const changeStatus = async (req, res) => {

    try {
        const status = req.body.status;

        const allowed = ['Not started', 'working', 'completed'];
        if (!allowed.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }
        await OrderModel.findByIdAndUpdate(req.params.id,
            { $set: { status } },
            { new: true })
        res.json({
            message: "Status updated to:",
            status
        })
    } catch (error) {
        res.status(500).json({
            message: "Error updating status"
        })
    }

}

export const updatePizzaForPublic = async (req, res) => {
    const { title, image, price, desc } = req.body

    try {
        const updatedItem = {}

        if (title) updatedItem.title = title
        if (image) updatedItem.image = image
        if (price != undefined) updatedItem.price = price
        if (desc) updatedItem.desc = desc

        const updatedPizza = await PizzaModel.findByIdAndUpdate(req.params.id,
            { $set: updatedItem },
            { new: true }
        )
        if (!updatedPizza) {
            return res.status(404).json({ message: "Pizza not found" });
        }

        res.json({
            updatedItem,
            message: "Got updated"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error updating Public Pizza "
        })
    }

}

export const deletePizzaFromPublic = async (req, res) => {

    try {
        await PizzaModel.findByIdAndDelete(req.params.id)

        res.json({

            message: "Pizza deleted"
        })
    } catch (error) {
        error
    }

}

export const checkInventoryThreshold = async (req, res) => {
    try {
        const { lowStockItems } = await getLowStockItems()

        if (lowStockItems.length === 0) {
            res.json({
                message: "All items are above threshold"
            })
        }
        else {
            res.json({
                message: "This are less than threshold ",
                lowStockItems
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "issue checking",
            error
        })
    }
}

export const getAdminDashboardStats = async (req, res) => {

    try {
        const totalOrders = await OrderModel.countDocuments()
        const totalMenuPizzas = await PizzaModel.countDocuments()

        const { lowStockItems, allItems } = await getLowStockItems()


        //    additional stats 
        const notStartedOrders = await OrderModel.countDocuments({ status: 'Not started' });
    const workingOrders    = await OrderModel.countDocuments({ status: 'working' });
    const completedOrders  = await OrderModel.countDocuments({ status: 'completed' }); 
        
        const LowStockItemsCount = lowStockItems.length
       

        res.json({
            totalOrders,
            totalMenuPizzas,
            totalInventoryItems: allItems.length,
            lowStockItemsCount: LowStockItemsCount,
            notStartedOrders,
            workingOrders,
            completedOrders
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to fetch dashboard statistics'
        });
    }

}