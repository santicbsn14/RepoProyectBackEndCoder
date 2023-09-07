import {
    addProductByCart,
    getProductsByCartId,
    newCart,
    getall,
    deleteCart,
    updateCart,
    finalyBuy,
    deleteProductByCart
  } from "../Controllers/cartController.js";
  import { Router } from "express";
import auth from "../Middlewares/auth.js";

  let cartRouter = Router();

  cartRouter.get('/', getall);

  cartRouter.post("/",  newCart);

  cartRouter.post("/:cid/product/:pid",auth, addProductByCart);

  cartRouter.get("/:cid",auth, getProductsByCartId);

  cartRouter.put('/:cid', auth, updateCart);

  cartRouter.delete("/:cid", auth, deleteCart);

  cartRouter.post('/:cid/purchase', auth, finalyBuy);

  cartRouter.delete('/:cid/product/:pid', auth, deleteProductByCart);

  export default cartRouter;
  