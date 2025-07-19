import express from "express"
import AuthMiddleware from "../middlewares/authMiddleware.js"
import { addOrder, allPizzas, customPizza, getMyOrders, myCustomPizzas } from "../controllers/pizzaController.js"





const PizzaRouter = express.Router()

PizzaRouter.get("/",AuthMiddleware,allPizzas)
PizzaRouter.post("/custom-pizza",AuthMiddleware,customPizza)
PizzaRouter.get("/custom/mine",AuthMiddleware,myCustomPizzas)
PizzaRouter.post("/order",AuthMiddleware,addOrder)
PizzaRouter.get("/orders/mine",AuthMiddleware,getMyOrders)

export default PizzaRouter