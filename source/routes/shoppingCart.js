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
  let cartRouter = Router();
  cartRouter.get('/', getall)
  cartRouter.post("/", newCart);
  cartRouter.post("/:cid/product/:pid", addproductbycart);
  cartRouter.get("/:cid", getproductsbycartid);
  cartRouter.put('/:cid', updateCart)
  cartRouter.put('/:cid/product/:pid', updateProductCart)
  cartRouter.delete("/:cid", deletecart);
  export default cartRouter;
  