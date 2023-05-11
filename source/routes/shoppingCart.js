import { addproductbycart, getproductsbycartid, newCart } from "../controllers/cartcontroller.js";
import { Router } from "express";
 let cartRouter = Router()

cartRouter.post('/', newCart)
cartRouter.post('/:cid/product/:pid', addproductbycart)
cartRouter.get('/:cid', getproductsbycartid)
cartRouter.delete('/:cid',)
export default cartRouter