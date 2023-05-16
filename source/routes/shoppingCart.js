import {
    addproductbycart,
    getproductsbycartid,
    newCart,
    deletecart,
  } from "../controllers/cartcontroller.js";
  import { Router } from "express";
  let cartRouter = Router();
  
  cartRouter.post("/", newCart);
  cartRouter.post("/:cid/product/:pid", addproductbycart);
  cartRouter.get("/:cid", getproductsbycartid);
  cartRouter.delete("/:cid", deletecart);
  export default cartRouter;
  