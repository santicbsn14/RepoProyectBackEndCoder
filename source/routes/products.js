import { Router } from "express";
import ProductManager from "../Manager/ProductManager.js";
import {
  getall,
  getone,
  save,
  update,
  deleteone,
} from "../controllers/productcontroller.js";
const productManager = new ProductManager();
const productsRouter = Router();

productsRouter.get("/", getall);

productsRouter.get("/:pid", getone);
productsRouter.post(`/`, save);
productsRouter.put(`/:pid`, update);
productsRouter.delete(`/:pid`, deleteone);

export default productsRouter;
