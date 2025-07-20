
import express from "express"
import adminMiddleware from "../middlewares/adminMiddleware.js"
import { addItem, addPizza, allOrders, changeStatus, deletePizzaFromPublic, getInventory, manualUpdate, seeCustomPizzas, updatePizzaForPublic } from "../controllers/adminController.js"

 const adminRouter = express.Router()

adminRouter.post("/new-pizza",adminMiddleware,addPizza)
adminRouter.get("/custom/all",adminMiddleware,seeCustomPizzas)
adminRouter.get("/inventory",adminMiddleware,getInventory)
adminRouter.post("/add-item",adminMiddleware,addItem)
adminRouter.put("/update/manual/:id",adminMiddleware,manualUpdate)
adminRouter.get("/all-orders",adminMiddleware,allOrders)
adminRouter.put("/orders/:id/status",adminMiddleware,changeStatus)
adminRouter.put("/pizza-update/:id/public",adminMiddleware,updatePizzaForPublic)
adminRouter.delete("/pizza/delete/:id",adminMiddleware,deletePizzaFromPublic)

export default adminRouter
