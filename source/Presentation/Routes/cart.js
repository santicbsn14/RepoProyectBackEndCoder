import {
    addProductByCart,
    getProductsByCartId,
    newCart,
    getall,
    deleteCart,
    updateCart,
    updateProductCart,
    finalyBuy,
    deleteProductByCart
  } from "../Controllers/cartController.js";
  import { Router } from "express";
import auth from "../Middlewares/auth.js";

  let cartRouter = Router();

  cartRouter.get('/',auth, getall);

  cartRouter.post("/", auth, newCart);

  cartRouter.post("/:cid/product/:pid", addProductByCart);

  cartRouter.get("/:cid", getProductsByCartId);

  cartRouter.put('/:cid', auth, updateCart);

  cartRouter.put('/:cid/product/:pid', auth, updateProductCart);

  cartRouter.delete("/:cid", auth, deleteCart);

  cartRouter.post('/:cid/purchase', auth, finalyBuy);

  cartRouter.delete('/:cid/product/:pid', auth, deleteProductByCart);

  export default cartRouter;
  