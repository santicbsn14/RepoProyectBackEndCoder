import {
    addproductbycart,
    getproductsbycartid,
    newCart,
    getall,
    deletecart,
  } from "../controllers/cartcontroller.js";
  import { Router } from "express";
  let cartRouter = Router();
  cartRouter.get('/', getall)
  cartRouter.post("/", newCart);
  cartRouter.post("/:cid/product", addproductbycart);
  cartRouter.get("/:cid", getproductsbycartid);
  cartRouter.delete("/:cid", deletecart);
  export default cartRouter;
  