import {
    addproductbycart,
    getproductsbycartid,
    newCart,
    getall,
    deletecart,
    updateCart,
    updateProductCart
  } from "../controllers/cartcontroller.js";
  import { Router } from "express";
import auth from "../middlewares/auth.js";
  let cartRouter = Router();
  cartRouter.get('/', getall)
  cartRouter.post("/", auth, newCart);
  cartRouter.post("/:cid/product/:pid", auth, addproductbycart);
  cartRouter.get("/:cid",auth, getproductsbycartid);
  cartRouter.put('/:cid', auth, updateCart)
  cartRouter.put('/:cid/product/:pid', auth, updateProductCart)
  cartRouter.delete("/:cid", auth, deletecart);
  export default cartRouter;
  