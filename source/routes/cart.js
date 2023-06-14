import {
    addProductByCart,
    getProductsByCartId,
    newCart,
    getall,
    deleteCart,
    updateCart,
    updateProductCart
  } from "../Controllers/cartcontroller.js";
  import { Router } from "express";
import auth from "../Middlewares/auth.js";

  let cartRouter = Router();

  cartRouter.get('/', getall);

  cartRouter.post("/", auth, newCart);

  cartRouter.post("/:cid/product/:pid", addProductByCart);

  cartRouter.get("/:cid", getProductsByCartId);

  cartRouter.put('/:cid', auth, updateCart);

  cartRouter.put('/:cid/product/:pid', auth, updateProductCart);

  cartRouter.delete("/:cid", auth, deleteCart);

  export default cartRouter;
  